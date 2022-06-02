const clipboard = require('electron').clipboard

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    const messageText = document.getElementById("message");
    for (const [dependency, color] of [['chrome', '#A0E0D0'], ['node', '#E0A0D0'], ['electron', '#A0D0E0']]) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
        const list_text = document.getElementById(`${dependency}-version`);
        list_text.parentElement.addEventListener('click', () => {
           clipboard.writeText(process.versions[dependency]);

           if (messageText.classList.contains('hidden')) {
               messageText.classList.remove('hidden');
               messageText.classList.remove('visually_hidden');
               setTimeout(() => {
                   messageText.classList.add('visually_hidden');
                   messageText.addEventListener('transitionend', () => {
                       messageText.classList.add('hidden');
                   }, {
                       capture: false,
                       once: true,
                       passive: false,
                   });
               }, 20);
           }
        });
        const list_element = document.getElementById(`${dependency}-list`);
        list_element.style.backgroundColor = color;
    }

    const title = document.getElementById('title');
    title.addEventListener('click', () => {
       title.style.backgroundColor = `rgb(${Math.floor(Math.random()*100)},${Math.floor(Math.random()*100)},${Math.floor(Math.random()*100)})`;
    });
});