// document.addEventListener('DOMContentLoaded', () => {
//     const typingText = document.querySelector('.typing-text p');
//     const input = document.querySelector('.wrapper .input-feild');
//     const time = document.querySelector('.time span b');
//     const mistake = document.querySelector('.mistake span');
//     const wpm = document.querySelector('.wpm span');
//     const cpm = document.querySelector('.cpm span');
//     const button = document.querySelector('button');

//     // set values
//     let timer;
//     let maxTime = 60;
//     let timeLeft = maxTime;
//     let charIndex = 0;
//     let mistakes = 0;
//     let isTyping = false;

//     function loadParagraph() {
//         const paragraph = [
//             "The quick brown fox jumps over the lazy dog.",
//             "Typing is a skill that improves with practice.",
//             "JavaScript makes web pages interactive and dynamic.",
//             "Stay focused and type each word carefully.",
//             "Coding can be fun when you build cool projects.",
//             "Speed and accuracy are key in typing tests.",
//             "Practice every day to improve your typing speed.",
//             "Always keep your fingers on the home row keys.",
//             "Short paragraphs help build confidence in beginners.",
//             "Errors reduce your score, so type with care."
//         ];
//         const randomIndex = Math.floor(Math.random() * paragraph.length);
//         typingText.innerHTML = '';
//         for (const char of paragraph[randomIndex]) {
//             typingText.innerHTML += `<span>${char}</span>`;
//         }
//         const spans = typingText.querySelectorAll('span');
//         if (spans.length > 0) {
//             spans[0].classList.add('active');
//         }

//         document.addEventListener('keydown', () => {
//             input.focus();
//         });
//     }

//     function initTyping() {
//         const char = typingText.querySelectorAll('span');
//         const typeChar = input.value.charAt(charIndex);

//         if (!isTyping) {
//             timer = setInterval(initTime, 1000);
//             isTyping = true;
//         }

//         if (charIndex < char.length && timeLeft > 0) {
//             if (char[charIndex].innerHTML === typeChar) {
//                 char[charIndex].classList.add('correct');
//             } else {
//                 mistakes++;
//                 char[charIndex].classList.add('incorrect');
//             }
//             char[charIndex].classList.remove('active');
//             charIndex++;
//             if (charIndex < char.length) {
//                 char[charIndex].classList.add('active');
//             }
//             mistake.innerHTML = mistakes;
//             cpm.innerHTML = charIndex-mistakes;
//         } else {
//             clearInterval(timer);
//             input.value = "";
//         }
//     }

//     function initTime() {
//         if (timeLeft > 0) {
//             timeLeft--;
//             time.innerHTML = timeLeft;
//             let wpm1 = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
//             wpm.innerHTML = wpm1 < 0 || !wpm1 || wpm1 === Infinity ? 0 : wpm1;
//         } else {
//             clearInterval(timer);
//         }
//     }

//     if (input) {
//         input.addEventListener('input', initTyping);
//     }

//     button.addEventListener('click',()=>{
//         loadParagraph();
//         clearInterval(timer);
//         timeLeft=maxTime;
//         charIndex = 0;
//         mistake = 0;
//         isTyping = false;
//     })
//     loadParagraph();
// });


document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text p');
    const input = document.querySelector('.wrapper .input-feild');
    const time = document.querySelector('.time span b');
    const mistakeDisplay = document.querySelector('.mistake span');
    const wpmDisplay = document.querySelector('.wpm span');
    const cpmDisplay = document.querySelector('.cpm span');
    const button = document.querySelector('button');

    // Initial values
    let timer;
    const maxTime = 60;
    let timeLeft = maxTime;
    let charIndex = 0;
    let mistakes = 0;
    let isTyping = false;

    // Paragraphs to choose from
    const paragraphs = [
        "The quick brown fox jumps over the lazy dog.",
        "Typing is a skill that improves with practice.",
        "JavaScript makes web pages interactive and dynamic.",
        "Stay focused and type each word carefully.",
        "Coding can be fun when you build cool projects.",
        "Speed and accuracy are key in typing tests.",
        "Practice every day to improve your typing speed.",
        "Always keep your fingers on the home row keys.",
        "Short paragraphs help build confidence in beginners.",
        "Errors reduce your score, so type with care."
    ];

    // Load a new random paragraph
    function loadParagraph() {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        typingText.innerHTML = '';
        [...paragraphs[randomIndex]].forEach(char => {
            typingText.innerHTML += `<span>${char}</span>`;
        });
        typingText.querySelector('span').classList.add('active');
        input.value = '';
    }

    // Typing logic
    // function initTyping() {
    //     const characters = typingText.querySelectorAll('span');
    //     const typedChar = input.value.charAt(charIndex);

    //     if (!isTyping) {
    //         timer = setInterval(initTime, 1000);
    //         isTyping = true;
    //     }

    //     if (charIndex < characters.length && timeLeft > 0) {
    //         if (characters[charIndex].innerText === typedChar) {
    //             characters[charIndex].classList.add('correct');
    //         } else {
    //             characters[charIndex].classList.add('incorrect');
    //             mistakes++;
    //         }

    //         characters[charIndex].classList.remove('active');
    //         charIndex++;

    //         if (charIndex < characters.length) {
    //             characters[charIndex].classList.add('active');
    //         }

    //         mistakeDisplay.innerText = mistakes;
    //         cpmDisplay.innerText = charIndex - mistakes;
    //     }

    //     if (charIndex === characters.length) {
    //         clearInterval(timer);
    //         input.blur();
    //     }
    // }
    function initTyping(e) {
        const characters = typingText.querySelectorAll('span');
        const typedChar = input.value.charAt(charIndex);
    
        // Start timer on first input
        if (!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
    
        // Handle backspace
        if (e.inputType === 'deleteContentBackward') {
            if (charIndex > 0) {
                charIndex--;
                characters[charIndex].classList.remove('correct', 'incorrect', 'active');
    
                // Adjust mistake count if incorrect char was removed
                if (characters[charIndex].classList.contains('incorrect')) {
                    mistakes--;
                }
    
                characters[charIndex].classList.add('active');
                mistakeDisplay.innerText = mistakes;
                cpmDisplay.innerText = charIndex - mistakes;
            }
            return;
        }
    
        // Normal typing
        if (charIndex < characters.length && timeLeft > 0) {
            const currentChar = characters[charIndex].innerText;
    
            if (typedChar === currentChar) {
                characters[charIndex].classList.add('correct');
            } else {
                characters[charIndex].classList.add('incorrect');
                mistakes++;
            }
    
            characters[charIndex].classList.remove('active');
            charIndex++;
    
            if (charIndex < characters.length) {
                characters[charIndex].classList.add('active');
            }
    
            mistakeDisplay.innerText = mistakes;
            cpmDisplay.innerText = charIndex - mistakes;
        }
    
        if (charIndex === characters.length) {
            clearInterval(timer);
            input.blur();
        }
    }
    

    // Timer logic
    function initTime() {
        if (timeLeft > 0) {
            timeLeft--;
            time.innerText = timeLeft;

            const wpmCalc = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
            wpmDisplay.innerText = wpmCalc > 0 && isFinite(wpmCalc) ? wpmCalc : 0;
        } else {
            clearInterval(timer);
            input.blur();
        }
    }

    // Reset everything on button click
    button.addEventListener('click', () => {
        loadParagraph();
        clearInterval(timer);
        timeLeft = maxTime;
        charIndex = 0;
        mistakes = 0;
        isTyping = false;

        time.innerText = timeLeft;
        mistakeDisplay.innerText = 0;
        wpmDisplay.innerText = 0;
        cpmDisplay.innerText = 0;

        input.value = '';
    });

    // Focus input on key press
    document.addEventListener('keydown', () => input.focus());

    // Typing listener
    input.addEventListener('input', initTyping);

    // Initial paragraph load
    loadParagraph();
});
