---
title:  "Immutability"
thumbnail: "web.jpg"
description: "A quick love letter to immutability."
---

Immutability is everywhere we look now. Take Blockchain, for example--it keeps an immutable log of transactions, which is maintained on computers across the web. Event sourcing is also built around the idea of mantaining an immutable log of events that can be replayed at will.

After using Scala and learning more about functional programming, I too find myself increasingly tempted to include immutability in my object-oriented code. It's somewhat true that premature optimisation is the root of all evil, and we certainly wouldn't want to shoehorn immutability into places where it isn't necessary, but there are benefits to it that go beyond the functionality of your application. For one, immutable code is much easier to debug and to understand.

Say we're writing code to manage a bank account. We might be tempted to store a single number, initalised with the current balance of the account and updating it whenever we deposit or withdraw, like so:

```
class BankAccount {

    constructor(private balance: number = 0) {}
    
    public getBalance(): number { return this.balance; }

    public deposit(amount: number): void {
        if (amount < 0) {
            throw new Error("Must deposit a positive amount.");
        }

        this.balance += amount;
    }

    public withdraw(amount: number): void {
        if (amount < 0) {
            throw new Error("Must withdraw a positive amount.");
        }

        if (this.balance < amount) {
            throw new Error("Insufficient funds.");
        }

        this.balance -= amount;
    }

}
```

Here's the immutable example, with validation left out for concision:
```
class BankAccount {

    constructor(private transactions: number[] = []) {}

    public getBalance(): number { return this.transactions.reduce((balance, tx) => balance + tx); }

    public deposit(amount: number): void { this.transactions.push(Math.abs(amount)); }

    public withdraw(amount: number): void { this.transactions.push(-Math.abs(amount)); }

}

The problem? What if a transaction fails, and we want to roll it back.

To those who complain that immutable code is inefficient--all of those new objects being created every time you make a change--well, it doesn't have to be. Treating your classes like value objects can go a long way towards mitigating the problem of an explosion of objects.

There's a simple way to start introducing immutability in your code base. In javascript, it can be as easy as using `const` by default, instead of `let`. I highly recommend giving immutability a go.
