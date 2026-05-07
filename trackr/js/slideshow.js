// Automatic Slideshow for Screenshots
document.addEventListener('DOMContentLoaded', function() {
    // Main slideshow
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showNextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Start the main slideshow - change slide every 5 seconds
    setInterval(showNextSlide, 5000);
    
    // UI Section slideshow
    const uiSlides = document.querySelectorAll('.ui-slide');
    let currentUiSlide = 0;
    
    function showNextUiSlide() {
        uiSlides[currentUiSlide].classList.remove('active');
        currentUiSlide = (currentUiSlide + 1) % uiSlides.length;
        uiSlides[currentUiSlide].classList.add('active');
    }
    
    // Start the UI slideshow - change slide every 5 seconds
    setInterval(showNextUiSlide, 5000);
});
