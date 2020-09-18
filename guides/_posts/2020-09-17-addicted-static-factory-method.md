---
title:  "What I'm addicted to right now"
thumbnail: "code.jpg"
description: "What are some cool ways to use static factory methods."
---

Do you use static factory methods? I've been using them for a while, ever since I read about them in Joshua Bloch's Effective Java. I mean, I used them prior to that, but his explanation really hit home how useful they can be, and I've been addicted to them ever since.

## Simplifies generics

In languages where types cannot be inferred on a constructor, a static method can get around this problem.

```typescript
class Blah<T> {
    constructor(public readonly value: T) {}
    
    static With<TO>(value: TO): Blah<TO> {
        return new Blah<TO>(value);
    }
}

class Consumer {
    run(): void {
        const blahA = new Blah<string>("some value");
        const blahB = Blah.With("some value");
    }
}
```



## Great for encapsulation

### Return a subtype

Using a static method instead of a constructor means we're not forced to return a single concrete type. We're free to make the return type of our factory method an interface or a parent class and return anything that conforms to the returned type's contract.

```typescript
interface NumberGenerator {
    (): number;
}

class NumberGenerators {
    static Random: NumberGenerator = () => Math.rand();
	static get Sequential(): NumberGenerator {
        let n = 0;
        return () => n++;
    }
}
```

### Prevents subclassing

In languages where `sealed` or `final` is not available, we can allow the user to construct an instance of our class whilst still preventing inheritance. This may seem like a bad thing, but inheritance is a form of coupling and composition is almost always favourable.

```typescript
class Blah {
    private constructor() {}
    
    static getInstance(): Blah {
        return new Blah();
    }
}
```

## Explicit

Static factory methods have names, which makes them more explicit. Take a look at the following example:

```typescript
class Transaction {
	private constructor(public readonly amount: number) {}
    
    static Credit(amount: number): Transaction {
        return new Transaction(Math.abs(amount));
    }
    
    static Debit(amount: number): Transaction {
        return new Transaction(-Math.abs(amount));
    }
}
````

If we rely on the constructor alone, the meaning of `amount` is unclear; how are we supposed to use it? what are the restrictions on its use?

With the addition of the static methods, the class's API becomes more obvious. Now we know that we can create two types of transaction: `Credit` and `Debit`. There's no distinction between signed and unsigned numbers in JavaScript, but by adding these two entry points we're telling consumers how the number is going to be handled. The underlying code is relatively trivial, but we could in theory have used a flag or an enum to store the extra bit of information (literally!) without affecting consumers of the class.

## Better than overloading

It also means that you can provide alternative ways of creating an object which share a type signature, but have a different meaning.

It provides another way of overloading where it doesn't exist, or instead of default values.

Typescript doesn't have proper constructor overloading, and the alternative is ugly.

Instead of wrestling with manual type checking, why not try this?

```
class Range<T> {
    constructor(
    	public readonly greaterThan?: T,
    	public readonly lessThan?: T
    ) {}

	static GreaterThan<T>(value: T) {
		return new Range<T>(value, null);
	}
	
	static LessThan(value: T) {
		return new Range<T>(null, value);
	}
}
```

## Better object construction

Static factory methods give us more control over what is returned when a consumer instantiates our class. A common use case here is caching. Here's a class that encapsulates colour information:

```typescript
class Colour {
    static WhiteRgb = "#FFFFFF";
    static White = new Colour(Color.WhiteRgb);
    
    static WithValue(rgb: string) {
        if (rgb === Colour.WhiteRgb) {
            return Colour.White;
        }
        
        return new Colour(rgb);
    }
}
```

By forcing the user through the static factory method, we're not required to return a new object every time the method is called. Instead, we're able to check whether the new value is equivalent to an existing one and return a cached copy, thereby reducing our memory overhead.

The infamous singleton pattern is one example of this treatment.

## Works well with varargs

Allows you to specify just one item, several items explicitly, or an array of items.

```typescript
class TransactionLog {
    constructor(transactions: Array<Transaction>) {}
    
    static ThatStartsWith(...transactions: Array<Transaction>): TransactionLog {
        return new TransactionLog(transactions);
    }
}
```

