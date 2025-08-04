document.addEventListener("DOMContentLoaded", function () {

  const stars = document.querySelectorAll(".star-rating span");
  const ratingInput = document.getElementById("rating");
  const ratingDisplay = document.getElementById("rating-display");

  if (stars.length && ratingInput) {
    stars.forEach((star) => {
      star.addEventListener("mouseenter", () => {
        highlightStars(star.getAttribute("data-value"));
      });

      star.addEventListener("mouseleave", () => {
        resetStars();
        setSelectedStars();
      });

      star.addEventListener("click", () => {
        const value = star.getAttribute("data-value");
        ratingInput.value = value;
        setSelectedStars(value);
        if (ratingDisplay) {
          ratingDisplay.textContent = `⭐ تقييمك: ${value} من 5`;
        }
        updateAriaChecked(value);
      });

      star.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          star.click();
          star.focus();
        }
      });
    });

    function highlightStars(value) {
      stars.forEach((star) => {
        if (parseInt(star.getAttribute("data-value")) <= value) {
          star.classList.add("hover");
        } else {
          star.classList.remove("hover");
        }
      });
    }

    function resetStars() {
      stars.forEach((star) => {
        star.classList.remove("hover");
        star.setAttribute("aria-checked", "false");
      });
    }

    function setSelectedStars(value = ratingInput.value) {
      const selectedValue = parseInt(value) || 0;
      stars.forEach((star) => {
        if (parseInt(star.getAttribute("data-value")) <= selectedValue) {
          star.classList.add("selected");
        } else {
          star.classList.remove("selected");
        }
      });
      updateAriaChecked(selectedValue);
    }

    function updateAriaChecked(value) {
      stars.forEach((star) => {
        const isChecked = parseInt(star.getAttribute("data-value")) === parseInt(value);
        star.setAttribute("aria-checked", isChecked ? "true" : "false");
      });
    }
  }


  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const successMessage = document.getElementById("success-message");
      if (successMessage) {
        successMessage.textContent = "✅ تم إرسال التقييم بنجاح!";
        successMessage.style.display = "block";
      }

      this.reset();
      if (ratingInput) ratingInput.value = "";
      if (ratingDisplay) ratingDisplay.textContent = "";
      stars.forEach((star) => star.classList.remove("selected"));
      updateAriaChecked(0);

      setTimeout(() => {
        if (successMessage) successMessage.style.display = "none";
      }, 3000);
    });
  }


  const counter = document.getElementById("visit-counter");
  if (counter) {
    let count = parseInt(localStorage.getItem("visitCount")) || 0;
    count++;
    localStorage.setItem("visitCount", count);
    counter.textContent = count;
  }


  AOS.init({
    duration: 700,
    once: false,
    offset: 120,
    easing: 'ease-in-out'
  });

 
  const text = "أهلاً بكم في معهد الخوارزمي";
  const typingElement = document.getElementById("typing-text");
  let index = 0;
  let isDeleting = false;

  function typeWriterLoop() {
    if (!typingElement) return;

    const visibleText = text.substring(0, index);
    typingElement.textContent = visibleText;

    if (!isDeleting && index === text.length) {
      setTimeout(() => {
        isDeleting = true;
        typeWriterLoop();
      }, 1000);
      return;
    }

    if (isDeleting && index === 0) {
      isDeleting = false;
    }

    index += isDeleting ? -1 : 1;
    setTimeout(typeWriterLoop, isDeleting ? 100 : 150);
  }

  typeWriterLoop();
});
