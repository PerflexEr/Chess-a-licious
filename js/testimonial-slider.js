document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".testimonial-container");
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;
  let interval;

  function getSlideDuration(index) {
    const textLength =
      testimonials[index].querySelector(".testimonial-text").textContent.length;
    return Math.min(Math.max(textLength * 100, 3000), 12000); 
  }

  function goToSlide(index) {
    testimonials.forEach((testimonial, i) => {
      testimonial.classList.toggle("active", i === index);
    });

    const activeSlide = testimonials[index];
    container.style.height = `${activeSlide.offsetHeight + 25}px`;
    container.style.transform = `translateX(-${index * 100}%)`;

    if (index === 0) {
      container.style.paddingBottom = "36px";
    } else {
      container.style.paddingBottom = "0";
    }

    resetTimer();
  }


  function startAutoSlide() {
    clearInterval(interval);
    interval = setTimeout(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      goToSlide(currentIndex);
    }, getSlideDuration(currentIndex));
  }

  function resetTimer() {
    startAutoSlide();
  }

  goToSlide(0);
  startAutoSlide();

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
      currentIndex = Math.min(currentIndex + 1, testimonials.length - 1);
      goToSlide(currentIndex);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      currentIndex = Math.max(currentIndex - 1, 0);
      goToSlide(currentIndex);
    }
  }
});
