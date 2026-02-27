export function initSlider() {
    let prevButton = document.getElementById('prev');
    let nextButton = document.getElementById('next');
    let container = document.querySelector('.container');
    let items = container.querySelectorAll('.list .item');
    let indicator = document.querySelector('.indicators');
    let dots = indicator.querySelectorAll('ul li');
    let list = container.querySelector('.list');

    let active = 0;
    let firstPosition = 0;
    let lastPosition = items.length - 1;

    function setSlider() {
        let itemOld = container.querySelector('.list .item.active');
        itemOld.classList.remove('active');

        let dotsOld = indicator.querySelector('ul li.active');
        dotsOld.classList.remove('active');
        dots[active].classList.add('active');

        indicator.querySelector('.number').innerHTML = '0' + (active + 1);
        items[active].classList.add('active');
    }

    nextButton.onclick = () => {
        list.style.setProperty('--calculation', 1);
        active = active + 1 > lastPosition ? 0 : active + 1;
        setSlider();
    }

    prevButton.onclick = () => {
        list.style.setProperty('--calculation', -1);
        active = active - 1 < firstPosition ? lastPosition : active - 1;
        setSlider();
    }

    // --- LÓGICA DE TOUCH (ARRASTAR) ---
    let touchStartX = 0;
    let touchEndX = 0;

    const section = document.querySelector('section');

    section.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    section.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleGesture();
    }, { passive: true });

    function handleGesture() {
        const swipedistance = 50; 
        if (touchEndX < touchStartX - swipedistance) {
            nextButton.click(); // Próximo jogador
        }
        if (touchEndX > touchStartX + swipedistance) {
            prevButton.click(); // Jogador anterior
        }
    }

    // Bloqueia o "scroll lateral" para não sair da página
    window.addEventListener('touchmove', function (e) {
        if (Math.abs(touchStartX - e.touches[0].screenX) > 5) {
            if (e.cancelable) e.preventDefault();
        }
    }, { passive: false });
}