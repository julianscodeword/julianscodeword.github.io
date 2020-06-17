const xWordClass = 'xword';
const xLineClass = 'xline';
const lineClass = 'line';
const wordPartClass = 'word-part';
const letterClass = 'letter';
const isAnimatedClass = 'kinetic';
const isVisibleClass = 'visible';
const isActiveClass = 'active';
const positionClass = 'position';

const xWordSelector = '.' + xWordClass;
const xLineSelector = '.' + xLineClass;
const wordPartSelector = '.' + wordPartClass;
const letterSelector = '.' + letterClass;
const pivotSelector = 'b';

const animationEndEvents = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';

function generateLetterCss(i) {
    return `
        .xword.${isAnimatedClass} .letter-${i} {
            transition-property: opacity, background-color;
            transition-duration: ${Math.pow(i, 2)}ms, 0s, 0s;
        }
    `;
}

function generatePositionCss(wordIndex, letterIndex) {
    return `
        .xword.${isAnimatedClass} .line-${wordIndex} .position-${letterIndex} {
            transition-delay: 0s, ${(letterIndex + 1) * 100}ms;
        }

        .xword.${isAnimatedClass} .line-${wordIndex}.${isActiveClass} .position-${letterIndex} {
            transition-property: all;
            transition-duration: 50ms;
            transition-delay: ${(letterIndex + 1) * 50}ms;
            filter: hue-rotate(${(letterIndex * 30)}deg) brightness(1.2);
        }
    `;
}

function getPrefix(node, selector) {
    return $(selector, node)[0].previousSibling && $(selector, node)[0].previousSibling.nodeValue || "";
}

function getPivot(node, selector) {
    return $(selector, node).text() || "";
}

function getSuffix(node, selector) {
    return $(selector, node)[0].nextSibling && $(selector, node)[0].nextSibling.nodeValue || "";
}

function generateLineHtml(line) {
    var link = $('a', line).first().attr('href');

    var prefix = getPrefix(line, pivotSelector);
    var pivot = getPivot(line, pivotSelector);
    var suffix = getSuffix(line, pivotSelector);

    var prefixLetters = prefix.replace(/(.)/g, `<span class="${letterClass}">$1</span>`);
    var pivotLetters = `<span class="letter">${pivot}</span>`;
    var suffixLetters = suffix.replace(/(.)/g, `<span class="${letterClass}">$1</span>`);

    return `
        <span class="head">
            <span class="${wordPartClass} prefix outer">${prefixLetters}</span>
        </span>
        <span class="body>
            <span class="${wordPartClass} pivot">${pivotLetters}</span>
        </span>
        <span class="tail">
            <span class="${wordPartClass} suffix outer">${suffixLetters}</span>
        </span>
    `;
}

function updateLetterCss(letters, generate) {
    var css = letters
        .map(function(j) { return generate(i, j); })
        .toArray()
        .join("\n");

    $("<style/>").text(css).appendTo(document.head);
}

function setupXWord(context) {
    var xWord = $(context);

    var wordParts = $(wordPartSelector, context);
    var letters = $(letterSelector, context);

    xWord.addClass(isVisibleClass);
    xWord.hover(() => xWord.addClass(isActiveClass), () => xWord.removeClass(isActiveClass));

    $(xLineSelector, this).each(function(i) { setupXLine(this, i); });


    wordParts.hover(() => line.addClass(isActiveClass), () => line.removeClass(isActiveClass));

    wordParts
        .click(
            function() {
                if(!xword.hasClass(isAnimatedClass)) {
                    // go to link
                    return true;
                }

                xword.removeClass(isVisibleClass);
                wordLetters.one(
                    animationEndEvents,
                    function() {
                        // go to link
                    }
                );
            }
        );

    updateLetterCss(letters, generateLetterCss);
    letters
        .sort(function() { return Math.random() - 0.5; })
        .each(function(i) { $(this).addClass(letterClass + '-' + i); });
}

function setupXLine(context, i) {
    var line = $(context);

    line.addClass(lineClass + '-' + i);
    line.html(function () { return generateLineHtml(this); });

    var letters = $(letterSelector, context);
    updateLetterCss(letters, generatePositionCss);
    letters.map(function (i) { $(this).addClass(positionClass + '-' + i); });
}

$(() => { $(xWordSelector).each(function() { setupXWord(this); }); });
