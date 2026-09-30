// Image Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners for arrow buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart autoplay after manual change
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart autoplay after manual change
        });
    }

    // Start autoplay
    if (slides.length > 0) {
        startAutoPlay();
    }

    // Dropdown tapping is handled in script.js, which every page loads.
});
