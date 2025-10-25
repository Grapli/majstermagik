document.addEventListener('DOMContentLoaded', function() {
    // 1. DYNAMICZNA AKTUALIZACJA ROKU W STOPCE (WCAG, Wygoda)
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();

    // 2. NAWIGACJA MOBILNA (WCAG, UX)
    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.getElementById('menu-list');
    
    // Funkcja przełączania widoczności menu
    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuList.classList.toggle('active');
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Zamykanie menu po kliknięciu w link (na mobile)
    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                // Dodatkowe sprawdzenie, czy menu jest otwarte, by uniknąć błędu
                if (menuList.classList.contains('active')) {
                    toggleMenu(); 
                }
            }
        });
    });


    // 3. OBSŁUGA PŁYNNEGO PRZEWIJANIA (fallback, choć CSS już wspiera)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Zapobiega domyślnemu przeskoczeniu
            e.preventDefault(); 
            // Płynne przewijanie do celu
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 4. ANIMACJA POJAWIANIA SIĘ SEKCJI (DYNAMIKA)
    // Używamy Intersection Observer, który jest lekki i nie spowalnia Pagespeed, 
    // w przeciwieństwie do ciężkich bibliotek (AOS, WOW.js)
    const faders = document.querySelectorAll('.section');

    const appearOptions = {
        threshold: 0.1, // Element pojawi się, gdy 10% będzie widoczne
        rootMargin: "0px 0px -50px 0px" // Trochę szybciej niż standardowo
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries, 
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Jeśli nie widać, nic nie rób
            } else {
                entry.target.classList.add('appear'); // Dodaj klasę, by uruchomić CSS
                appearOnScroll.unobserve(entry.target); // Usuń obserwatora
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fading-element'); // Dodaj klasę bazową
        appearOnScroll.observe(fader);
    });
});

// DODATKOWY CSS DO ANIMACJI W style.css:
/*
.fading-element {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s ease-out, transform 0.8s ease-out;
}

.fading-element.appear {
    opacity: 1;
    transform: translateY(0);
}
*/