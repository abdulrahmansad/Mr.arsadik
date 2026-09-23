const WHATSAPP_NUMBER = "905362015920";

const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
dateInput.min = `${yyyy}-${mm}-${dd}`;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const type = document.getElementById("callType").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const name = document.getElementById("name").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!type || !date || !time || !name || !description) return;

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date + "T12:00:00"));

  const message = [
    "Hi Abdullah, I’d like to request a call.",
    "",
    `Name: ${name}`,
    `Call type: ${type}`,
    `Preferred date: ${formattedDate}`,
    `Preferred time: ${time}`,
    "",
    "Context:",
    description,
    "",
    "Please let me know if this time works for you."
  ].join("\n");

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", (event) => {
  if (!glow || window.matchMedia("(max-width: 699px)").matches) return;
  glow.style.left = event.clientX + "px";
  glow.style.top = event.clientY + "px";
});

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(max-width: 899px)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 3.5}deg) rotateY(${x * 4.5}deg)`;
  });
  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(max-width: 899px)").matches) return;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    button.style.transform = `translate(${x * 0.07}px,${y * 0.07}px)`;
  });
  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});