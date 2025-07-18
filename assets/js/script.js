// Mobile Menu Toggle
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Close mobile menu if open
    mobileMenu.classList.add("hidden");

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.classList.add("shadow-xl");
    header.classList.add("py-2");
  } else {
    header.classList.remove("shadow-xl");
    header.classList.remove("py-2");
  }
});

// Form submission
const reservationForm = document.querySelector(".reservation-form");
if (reservationForm) {
  reservationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Terima kasih! Reservasi Anda telah berhasil dikirim. Kami akan segera menghubungi Anda untuk konfirmasi."
    );
    reservationForm.reset();
  });
}

// Newsletter subscription
const newsletterForm = document.querySelector("footer form");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    if (emailInput.value) {
      alert(
        `Terima kasih! Email ${emailInput.value} telah berhasil terdaftar untuk newsletter kami.`
      );
      emailInput.value = "";
    }
  });
}
