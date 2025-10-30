document.addEventListener('DOMContentLoaded', function() {

    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();


    const menuToggle = document.querySelector('.menu-toggle');
    const menuList = document.getElementById('menu-list');
    

    function toggleMenu() {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuList.classList.toggle('active');
    }

    menuToggle.addEventListener('click', toggleMenu);


    menuList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {

                if (menuList.classList.contains('active')) {
                    toggleMenu(); 
                }
            }
        });
    });



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


    const faders = document.querySelectorAll('.section');

    const appearOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries, 
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; 
            } else {
                entry.target.classList.add('appear'); 
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        fader.classList.add('fading-element');
        appearOnScroll.observe(fader);
    });
});



    const counterSection = document.querySelector('.counter-section');
    const counters = document.querySelectorAll('.stat-number');
    let counterExecuted = false;


    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const speed = 200; 
        const increment = target / speed;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            
     
            if (current >= target) {
                clearInterval(timer);
                counter.textContent = target.toLocaleString('pl-PL') + (target >= 1980 ? '+' : ''); 
                return;
            }

            counter.textContent = Math.ceil(current).toLocaleString('pl-PL');
        }, 1);
    }

   
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterExecuted) {
                counters.forEach(animateCounter);
                counterExecuted = true;
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    if (counterSection) {
        counterObserver.observe(counterSection);
    }