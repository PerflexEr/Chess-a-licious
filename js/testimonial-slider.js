document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".testimonial-container");
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;
  let interval;

  // Function to move to a specific slide
  function goToSlide(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("active", i === index);
    });
    container.style.transform = `translateX(-${index * 100}%)`;
  }

  // Auto-advance slides every 10 seconds
  function startAutoSlide() {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(currentIndex);
    }, 10000);
  }

  // Reset timer when manually changing slides
  function resetTimer() {
    clearInterval(interval);
    startAutoSlide();
  }

  // Initialize first slide as active
  goToSlide(0);

  // Initialize auto-slide
  startAutoSlide();

  // Add touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  container.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swipe left
      currentIndex = Math.min(currentIndex + 1, testimonials.length - 1);
      goToSlide(currentIndex);
      resetTimer();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swipe right
      currentIndex = Math.max(currentIndex - 1, 0);
      goToSlide(currentIndex);
      resetTimer();
    }
  }
});
