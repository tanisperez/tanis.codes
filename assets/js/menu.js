// Mobile menu

const menuTrigger = document.querySelector(".menu-trigger");
const menu = document.querySelector(".menu");

function toggleMenu() {
    if (menu.computedStyleMap().get('display').value === 'none') {
        menu.style['display'] = 'block';
    } else {
        menu.style.removeProperty('display');
    }
}

menuTrigger.addEventListener("click", toggleMenu);

menuTrigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        if (event.key === " ") {
            event.preventDefault();
        }
        toggleMenu();
    }
});
