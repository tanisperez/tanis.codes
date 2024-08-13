// Mobile menu

const menuTrigger = document.querySelector(".menu-trigger");
const menu = document.querySelector(".menu");

menuTrigger.addEventListener("click", () => {
    if (menu.computedStyleMap().get('display').value === 'none') {
        menu.style['display'] = 'block';
    } else {
        menu.style.removeProperty('display');
    }
});
