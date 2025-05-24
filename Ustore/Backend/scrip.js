
document.addEventListener("DOMContentLoaded", () => {
    // Referencias DOM
    let nextDom = document.getElementById("next");
    let prevDom = document.getElementById("prev");
    let carruselDom = document.querySelector(".carrusel");
    let listItemDom = document.querySelector(".carrusel .lista");
    let thumbnailDom = document.querySelector(".carrusel .thumbnail");

    let timeoRuning = 3000;
    let timeThumbnailNext = 7000;
    let runTimeOut;
    let runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeThumbnailNext);

    function showSlider(type) {
        const itemSlider = document.querySelectorAll(".carrusel .lista .item");
        const itemthumbnail = document.querySelectorAll(".carrusel .thumbnail .item");
        if (itemSlider.length === 0 || itemthumbnail.length === 0) return;

        if (type === 'next') {
            listItemDom.appendChild(itemSlider[0]);
            thumbnailDom.appendChild(itemthumbnail[0]);
            carruselDom.classList.add("next");
        } else {
            let last = itemSlider.length - 1;
            listItemDom.prepend(itemSlider[last]);
            thumbnailDom.prepend(itemthumbnail[last]);
            carruselDom.classList.add("prev");
        }

        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carruselDom.classList.remove("next", "prev");
        }, timeoRuning);

        clearTimeout(runAutoRun);
        runAutoRun = setTimeout(() => {
            nextDom.click();
        }, timeThumbnailNext);
    }

    nextDom.onclick = () => showSlider('next');
    prevDom.onclick = () => showSlider('prev');

    // Activar thumbnails como botones
    const thumbnailItems = document.querySelectorAll(".thumbnail .item");

    thumbnailItems.forEach((thumb) => {
        thumb.addEventListener("click", () => {
            const targetIndex = parseInt(thumb.dataset.index);
            const currentSlide = listItemDom.firstElementChild;
            const currentIndex = parseInt(currentSlide.dataset.index);

            let steps = 0;
            const items = listItemDom.querySelectorAll(".item");
            for (let i = 0; i < items.length; i++) {
                if (parseInt(items[i].dataset.index) === targetIndex) {
                    steps = i;
                    break;
                }
            }

            for (let i = 0; i < steps; i++) {
                listItemDom.appendChild(listItemDom.firstElementChild);
                thumbnailDom.appendChild(thumbnailDom.firstElementChild);
            }

            carruselDom.classList.add("next");
            clearTimeout(runTimeOut);
            runTimeOut = setTimeout(() => {
                carruselDom.classList.remove("next");
            }, timeoRuning);
            clearTimeout(runAutoRun);
            runAutoRun = setTimeout(() => {
                nextDom.click();
            }, timeThumbnailNext);
        });
    });

    // Menú hamburguesa
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    const toggleMenu = () => {
        navLinks.classList.toggle("active");
        menuIcon.classList.toggle("active");
    };

    menuIcon.addEventListener("click", toggleMenu);

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            navItems.forEach(link => link.classList.remove("active"));
            e.currentTarget.classList.add("active");
            if (window.innerWidth <= 1048) toggleMenu();
        });
    });

    document.addEventListener("click", (e) => {
        if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

});


// 5. Añadir funcionalidad del carrusel (necesario)
// ... (aquí iría el código del carrusel)
