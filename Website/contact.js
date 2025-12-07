function toggleMenu() {
  const navbar = document.querySelector(".navbar");
  const overlay = document.querySelector(".overlay");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  emailjs.send("service_dson3344", "template_dson3344", {
    name: formData.get("name"),
    gender: formData.get("gender"),
    age: formData.get("age"),
    email: formData.get("email"),
    message: formData.get("message"),
  })
    .then(function (response) {
      console.log("Success!", response.status, response.text);
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch(function (error) {
      console.error("Failed...", error);
      alert("Failed to send message. Please try again later.");
    });
});

window.addEventListener("scroll", () => {
  const button = document.getElementById("backToTop");
  if (window.scrollY > 400) {
    button.style.display = "flex";
  } else {
    button.style.display = "none";
  }
});

document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
