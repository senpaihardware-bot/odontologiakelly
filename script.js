console.log("SCRIPT CARGADO");
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));

  const floatingWhatsapp = document.getElementById("floatingWhatsapp");

  if (floatingWhatsapp) {
    floatingWhatsapp.addEventListener("click", () => {
      window.open("https://wa.me/573223454042", "_blank", "noopener");
    });
  }
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const text = `Hola, mi nombre es ${name}. ${message}`;
    const url = `https://wa.me/573223454042?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank", "noopener");
  });

  const modal = document.getElementById("mediaModal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalImage = document.getElementById("modalImage");
  const modalVideo = document.getElementById("modalVideo");
  const modalTitle = document.getElementById("modalTitle");

  const openModal = (type, src, title) => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    modalTitle.textContent = title || "";

    modalImage.style.display = "none";
    modalVideo.style.display = "none";
    modalVideo.pause();
    modalVideo.removeAttribute("src");

    if (type === "image") {
      modalImage.src = src;
      modalImage.alt = title || "Imagen ampliada";
      modalImage.style.display = "block";
    } else {
      modalVideo.src = src;
      modalVideo.style.display = "block";
      modalVideo.load();
    }
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    modalVideo.pause();
    modalVideo.removeAttribute("src");
  };

  document.querySelectorAll(".media-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.type, btn.dataset.src, btn.dataset.title);
    });
  });

  modalBackdrop.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});
