// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

// scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;
    let windowHeight = window.innerHeight;

    sections.forEach(sec => {
        let offset = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        // Зменшити значення на 200 для того, щоб наступна секція з'являлася раніше
        if (top + windowHeight >= offset + height / 2 - 200 && top < offset + height) {
            // активні посилання в навбарі
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

            // активні секції для анімації на скролі
            sec.classList.add('show-animate');
        } else {
            // видаляємо анімацію, коли секція виходить за межі
            sec.classList.remove('show-animate');
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // видаляємо іконку і навбар при натисканні на посилання в навбарі (під час скролу)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // анімація футера при скролі
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}


// Обмеження на ввід букв в поле номеру телефону
document.getElementById('mobileNumber').addEventListener('input', function(e) {
    // Забороняємо введення всіх символів, крім цифр та знаку '+'
    this.value = this.value.replace(/[^0-9+]/g, '');
});

// Відправка листа через EmailJS
function sendMail(event) {
    event.preventDefault(); // Запобігаємо стандартному відправленню форми

    let fullName = document.getElementById('fullName').value;
    let email = document.getElementById('email').value;
    let mobileNumber = document.getElementById('mobileNumber').value;
    let subject = document.getElementById('subject').value;
    let message = document.getElementById('message').value;

    // Перевірка на порожні поля
    if (!fullName || !email || !mobileNumber || !subject || !message) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    // Регулярний вираз для перевірки правильного формату email
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Перевірка, чи це коректна електронна пошта з доменом
    if (!emailPattern.test(email)) {
        document.getElementById('error-message').style.display = 'block';
        return;
    } else {
        document.getElementById('error-message').style.display = 'none';
    }

    // Регулярний вираз для перевірки номеру телефону
    var phonePattern = /^[+0-9]*$/; // Тільки + і цифри

    // Перевірка номера телефону
    if (!phonePattern.test(mobileNumber)) {
        alert("Please enter a valid phone number containing only numbers and a '+' sign.");
        return;
    }

    // Об'єкт з параметрами для відправлення
    let params = {
        name: fullName,
        email: email,
        phone: mobileNumber,
        subject: subject,
        message: message
    };

    // Відправка через EmailJS
    emailjs.send("service_0011", "template_e1h2kvx", params)
        .then(function(response) {
            alert("Email Sent!!");
            document.getElementById('contact-form').reset(); // Очистити форму після успішної відправки
        }, function(error) {
            alert("Failed to send email. Please try again later.");
            console.error("Error sending email:", error);
        });
}

// Додаємо обробник подій для форми
document.getElementById('contact-form').addEventListener('submit', sendMail);