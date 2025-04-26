let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");
let carruselDom = document.querySelector(".carrusel");
let listItemDom = document.querySelector(".carrusel .lista");
let thumbnailDom = document.querySelector(".carrusel .thumbnail");

nextDom.onclick = function () {
    showSlider('next');
}
prevDom.onclick = function () {
    showSlider('prev');
}
let timeoRuning = 3000;
let timeThumbnailNext = 7000;
let runTimeOut;
let runAutoRun = setTimeout(() => {
    nextDom.click();}, timeThumbnailNext);

function showSlider(type) {
    let itemSlider = document.querySelectorAll(".carrusel .lista .item");
    let itemthumbnail = document.querySelectorAll(".carrusel .thumbnail .item");
    if (type === 'next') {
        listItemDom.appendChild(itemSlider[0]);
        thumbnailDom.appendChild(itemthumbnail[0]);
        carruselDom.classList.add("next");
    }
    else if (type === 'prev') {
       let positionLastItem = itemSlider.length - 1;
        listItemDom.prepend(itemSlider[positionLastItem]);
        thumbnailDom.prepend(itemthumbnail[positionLastItem]);
        carruselDom.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carruselDom.classList.remove("next");
        carruselDom.classList.remove("prev");
    }, timeoRuning);
    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeThumbnailNext);
}

document.addEventListener("DOMContentLoaded", () => {
    // Elementos del menú
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a"); // Seleccionar los enlaces directamente
    // 1. Eliminar duplicado de DOMContentLoaded
    // 2. Corregir selector de navLinks (.nav-links vs .nav-links)
    // Función para alternar menú
    const toggleMenu = () => {
        console.log("Botón hamburguesa clickeado");
        navLinks.classList.toggle("active");
        menuIcon.classList.toggle("active"); // Añadir estado activo al ícono
    };

    // Event listeners
    menuIcon.addEventListener("click", toggleMenu);

    // Actualizar clase activa
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            // 3. Remover clase activa de todos los elementos
            navItems.forEach(link => link.classList.remove("active"));

            // 4. Añadir clase al elemento clickeado (enlace)
            e.currentTarget.classList.add("active");

            // Cerrar menú en móviles
            if (window.innerWidth <= 1048) { // Coherente con tu media query
                toggleMenu();
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener("click", (e) => {
        if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });
    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            // Si tiene submenú, activar su visualización en móviles
            const parentLi = e.currentTarget.parentElement;
            if (parentLi.classList.contains("has-submenu") && window.innerWidth <= 1048) {
                e.preventDefault(); // Evita que el enlace se siga
                parentLi.classList.toggle("active");
                return;
            }

            // Normal: cambiar el enlace activo
            navItems.forEach(link => link.classList.remove("active"));
            e.currentTarget.classList.add("active");

            if (window.innerWidth <= 1048) {
                toggleMenu();
            }
        });
    });

    // 5. Añadir funcionalidad del carrusel (necesario)
    // ... (aquí iría el código del carrusel)
});