function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.overlay');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var formData = new FormData(this);

    emailjs.send("service_dson3344", "template_dson3344", {
        name: formData.get('name'),
        gender: formData.get('gender'),
        age: formData.get('age'),
        email: formData.get('email'),
        message: formData.get('message')
    })
    .then(function(response) {
        console.log('Success!', response.status, response.text);
        alert('Message sent successfully!');
    })
    .catch(function(error) {
        console.error('Failed...', error);
        alert('Failed to send message. Please try again later.');
    });
});
