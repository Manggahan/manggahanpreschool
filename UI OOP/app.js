/* ============================================================
   🔐 1. ENCAPSULATION — User class with private fields
   ============================================================ */
class User {
    #email;
    #password;

    constructor(email, password) {
        this.#email = email;
        this.#password = password;
    }

    getEmail() {
        return this.#email;
    }

    validatePassword(input) {
        return this.#password === input;
    }
}

/* ============================================================
   🧱 2. ABSTRACTION — Page base class
   ============================================================ */
class Page {
    constructor(name) {
        this.name = name;
    }

    load() {
        console.log(`Loading ${this.name}...`);
    }
}

/* ============================================================
   🧬 3. INHERITANCE — Specific pages extending Page
   ============================================================ */
class HomePage extends Page {
    constructor() { super("Home Page"); }
}
class AboutPage extends Page {
    constructor() { super("About Page"); }
}
class ContactPage extends Page {
    constructor() { super("Contact Page"); }
}
class EnrollmentPage extends Page {
    constructor() { super("Enrollment Page"); }
}
class ThankYouPage extends Page {
    constructor() { super("Thank You Page"); }
}

/* ============================================================
   🔄 4. POLYMORPHISM — Buttons overriding same click() method
   ============================================================ */
class MenuButton {
    click() {
        console.log("Default button clicked");
    }
}
class EnrollButton extends MenuButton {
    click() { window.location = "enrollment.html"; }
}
class CurriculumButton extends MenuButton {
    click() { window.location = "curriculum.html"; }
}
class AboutUsButton extends MenuButton {
    click() { window.location = "aboutus.html"; }
}

/* ============================================================
   🎉 CONFETTI EFFECT (for Thank You page)
   ============================================================ */
function startConfetti() {
    const confettiScript = document.createElement("script");
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    document.body.appendChild(confettiScript);

    confettiScript.onload = () => {
        setInterval(() => {
            confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0 }
            });
        }, 700);
    };
}

/* ============================================================
   🎯 PAGE DETECTOR
   ============================================================ */
function detectPage() {
    const url = window.location.pathname;

    if (url.includes("index.html")) new HomePage().load();
    if (url.includes("about.html")) new AboutPage().load();
    if (url.includes("contact.html")) new ContactPage().load();
    if (url.includes("enrollment.html")) new EnrollmentPage().load();
    if (url.includes("end.html")) {
        new ThankYouPage().load();
        setTimeout(startConfetti, 500);
    }
}

/* ============================================================
   🎛️ MENU BUTTON ACTIVATION
   ============================================================ */
function activateMenuButtons() {
    const enrollBtn = document.querySelector(".pink1");
    const curriculumBtn = document.querySelector(".pink2");
    const aboutBtn = document.querySelector(".pink3");

    if (enrollBtn) enrollBtn.onclick = () => new EnrollButton().click();
    if (curriculumBtn) curriculumBtn.onclick = () => new CurriculumButton().click();
    if (aboutBtn) aboutBtn.onclick = () => new AboutUsButton().click();
}

/* ============================================================
   📝 FORM BEHAVIOR (Registration / Login / Enrollment)
   ============================================================ */
function setupForms() {
    // Registration → Login page
    if (document.querySelector("h1")?.innerText === "Registration Form") {
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            window.location = "Main2.html";
        });
    }

    // Login → MainWeb page
    if (document.querySelector("h1")?.innerText === "Login Form") {
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            window.location = "index.html";
        });
    }

    // Enrollment → Thank You page
    if (window.location.pathname.includes("enrollment.html")) {
        const form = document.querySelector("form");
        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                window.location = "end.html";
            });
        }
    }
}

/* ============================================================
   🚀 ON PAGE LOAD
   ============================================================ */
window.onload = function () {
    detectPage();
    activateMenuButtons();
    setupForms();
};
