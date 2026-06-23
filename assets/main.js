const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const cartCounters = document.querySelectorAll(".cart-count");
const cartButtons = document.querySelectorAll("[data-cart]");
const favoriteButtons = document.querySelectorAll("[data-favorite]");
const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");
const faqButtons = document.querySelectorAll("[data-faq-toggle]");
const galleryButtons = document.querySelectorAll("[data-gallery-image]");

const getCartCount = () => Number(localStorage.getItem("sondeliaCartCount") || "1");

const setCartCount = (count) => {
  localStorage.setItem("sondeliaCartCount", String(count));
  cartCounters.forEach((counter) => {
    counter.textContent = String(count);
    counter.setAttribute("aria-label", `${count} article${count > 1 ? "s" : ""} dans le panier`);
  });
};

setCartCount(getCartCount());

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
  });
}

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setCartCount(getCartCount() + 1);
    button.textContent = "Ajouté au panier";
    setTimeout(() => {
      button.textContent = "Ajouter au panier";
    }, 1600);
  });
});

favoriteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const isFavorite = button.getAttribute("aria-pressed") === "true";
    button.setAttribute("aria-pressed", String(!isFavorite));
    button.textContent = isFavorite ? "Ajouter aux favoris" : "Ajouté aux favoris";
  });
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const gallery = button.closest(".product-gallery");
    const mainImage = gallery?.querySelector("[data-gallery-main]");

    if (!mainImage) {
      return;
    }

    mainImage.src = button.dataset.galleryImage;
    mainImage.alt = button.dataset.galleryAlt;
    gallery.querySelectorAll("[data-gallery-image]").forEach((thumb) => {
      thumb.classList.toggle("is-active", thumb === button);
    });
  });
});

faqButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const answer = document.getElementById(button.getAttribute("aria-controls"));
    const icon = button.querySelector(".faq-toggle");
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));

    if (answer) {
      answer.hidden = isOpen;
    }

    if (icon) {
      icon.textContent = isOpen ? "+" : "-";
    }
  });
});

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent = "Merci, votre message est prêt à être envoyé.";
    contactForm.reset();
  });
}
