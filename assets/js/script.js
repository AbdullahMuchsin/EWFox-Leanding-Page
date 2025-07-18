document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("testimonial-slider");
  const prevBtn = document.getElementById("testimonial-prev");
  const nextBtn = document.getElementById("testimonial-next");
  const dotsContainer = document.getElementById("testimonial-dots");
  const testimonialCards = Array.from(slider.children);

  let currentIndex = 0;
  let autoSlideInterval;
  const slideIntervalTime = 5000; // 5 seconds

  // Function to calculate items per view based on screen width
  const getItemsPerView = () => {
    if (window.innerWidth >= 1024) {
      return 3; // Large screens: 3 testimonials
    } else if (window.innerWidth >= 768) {
      return 2; // Medium screens: 2 testimonials
    } else {
      return 1; // Small screens: 1 testimonial
    }
  };

  let itemsPerView = getItemsPerView();

  // Create pagination dots
  const createDots = () => {
    dotsContainer.innerHTML = ""; // Clear existing dots
    const totalPages = Math.ceil(testimonialCards.length / itemsPerView);
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("button");
      dot.classList.add(
        "w-3",
        "h-3",
        "rounded-full",
        "bg-gray-300",
        "hover:bg-foxOrange",
        "transition-colors",
        "duration-300"
      );
      if (i === 0) {
        dot.classList.add("bg-foxOrange");
      }
      dot.addEventListener("click", () => {
        currentIndex = i * itemsPerView;
        updateSliderPosition();
        updateDots();
        resetAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
  };

  // Update active dot
  const updateDots = () => {
    Array.from(dotsContainer.children).forEach((dot, index) => {
      const pageIndex = Math.floor(currentIndex / itemsPerView);
      if (index === pageIndex) {
        dot.classList.add("bg-foxOrange");
        dot.classList.remove("bg-gray-300");
      } else {
        dot.classList.remove("bg-foxOrange");
        dot.classList.add("bg-gray-300");
      }
    });
  };

  // Update slider position
  const updateSliderPosition = () => {
    const cardWidth = testimonialCards[0].offsetWidth; // Get width of one card including padding
    const scrollAmount = cardWidth * currentIndex;
    slider.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Navigation functions
  const showNext = () => {
    currentIndex += itemsPerView;
    if (currentIndex >= testimonialCards.length) {
      currentIndex = 0; // Loop back to the start
    }
    updateSliderPosition();
    updateDots();
  };

  const showPrev = () => {
    currentIndex -= itemsPerView;
    if (currentIndex < 0) {
      currentIndex = Math.max(0, testimonialCards.length - itemsPerView); // Go to the last "page"
    }
    updateSliderPosition();
    updateDots();
  };

  // Auto-slide functionality
  const startAutoSlide = () => {
    autoSlideInterval = setInterval(showNext, slideIntervalTime);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  const resetAutoSlide = () => {
    stopAutoSlide();
    startAutoSlide();
  };

  // Event Listeners
  prevBtn.addEventListener("click", () => {
    showPrev();
    resetAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    showNext();
    resetAutoSlide();
  });

  // Handle responsiveness
  const handleResize = () => {
    const newItemsPerView = getItemsPerView();
    if (newItemsPerView !== itemsPerView) {
      itemsPerView = newItemsPerView;
      currentIndex = 0; // Reset index on view change
      createDots();
      updateSliderPosition();
      updateDots();
    }
  };

  window.addEventListener("resize", handleResize);
  slider.addEventListener("scroll", stopAutoSlide); // Stop auto-slide on manual scroll

  // Initial setup
  createDots();
  updateSliderPosition();
  updateDots();
  startAutoSlide();
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking a link
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Testimonial Slider
const testimonialSlider = document.getElementById("testimonial-slider");
const prevButton = document.getElementById("testimonial-prev");
const nextButton = document.getElementById("testimonial-next");

let currentSlide = 0;

function updateSlider() {
  const cardWidth = document.querySelector(".testimonial-card").offsetWidth;
  testimonialSlider.scrollTo({
    left: currentSlide * cardWidth,
    behavior: "smooth",
  });
}

nextButton.addEventListener("click", () => {
  const totalSlides = document.querySelectorAll(".testimonial-card").length;
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
});

prevButton.addEventListener("click", () => {
  const totalSlides = document.querySelectorAll(".testimonial-card").length;
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Form submission
const reservationForm = document.querySelector("form");
if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert(
      "Terima kasih! Reservasi Anda telah berhasil dikirim. Kami akan menghubungi Anda untuk konfirmasi."
    );
    this.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function activateNavLink() {
    let scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 80;
      const sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("text-foxOrange", "active");
        });

        const activeLink = document.querySelector(
          `.nav-link[href="#${sectionId}"]`
        );
        if (activeLink) {
          activeLink.classList.add("text-foxOrange", "active");
        }
      }
    });
  }

  window.addEventListener("scroll", activateNavLink);
});
