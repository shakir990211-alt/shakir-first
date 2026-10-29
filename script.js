
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const admissionForm = document.getElementById("admissionForm");
const formMessage = document.getElementById("formMessage");
const backToTop = document.getElementById("backToTop");

// Mobile navigation
menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Display the current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Basic phone number validation
function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
}

// Admission form submission
admissionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.className = "form-message";
    formMessage.textContent = "";

    const studentName =
        document.getElementById("studentName").value.trim();

    const fatherName =
        document.getElementById("fatherName").value.trim();

    const age = Number(document.getElementById("age").value);

    const fatherPhone =
        document.getElementById("fatherPhone").value.trim();

    const studentPhone =
        document.getElementById("studentPhone").value.trim();

    const cnic = document.getElementById("cnic").value.trim();

    const robotChecked = document.getElementById("robot").checked;

    function showError(message) {
        formMessage.textContent = message;
        formMessage.className = "form-message error";
    }

    if (studentName.length < 2 || fatherName.length < 2) {
        showError("Please enter the student's and father's full names.");
        return;
    }

    if (!Number.isInteger(age) || age < 3 || age > 30) {
        showError("Please enter a valid age between 3 and 30.");
        return;
    }

    if (!isValidPhone(fatherPhone)) {
        showError("Please enter a valid father's contact number.");
        return;
    }

    if (studentPhone && !isValidPhone(studentPhone)) {
        showError("Please enter a valid student contact number.");
        return;
    }

    if (
        cnic &&
        !/^\d{5}-\d{7}-\d$/.test(cnic) &&
        !/^\d{13}$/.test(cnic)
    ) {
        showError(
            "Enter B-Form/CNIC as 12345-1234567-1 or 13 digits."
        );
        return;
    }

    if (!robotChecked) {
        showError("Please check the 'I am not a robot' box.");
        return;
    }

    // Demonstration only: no data is sent to a server.
    const student = {
        studentName: studentName,
        fatherName: fatherName,
        age: age,
        gender: document.getElementById("gender").value,
        className: document.getElementById("className").value
    };

    formMessage.className = "form-message success";
    formMessage.textContent =
        "Thank you, " + student.studentName +
        "! Your form passed the basic checks. " +
        "This demo has not sent or saved your application. " +
        "Please contact the school to complete your admission.";

    // Avoid saving sensitive student information in browser storage.
    console.log("Admission form validated successfully.");

    admissionForm.reset();
});

// Back-to-top button
window.addEventListener("scroll", function () {
    backToTop.classList.toggle("visible", window.scrollY > 300);
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
