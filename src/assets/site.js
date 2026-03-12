const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const menuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    document.body.classList.toggle("mobile-open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      document.body.classList.remove("mobile-open");
    });
  });
}

if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    requestAnimationFrame(() => target.scrollIntoView());
  }
}

const form = document.getElementById("newsletter-form");
const statusEl = document.getElementById("newsletter-status");

if (form instanceof HTMLFormElement && statusEl) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = form.querySelector('input[type="email"]');
    if (!(emailInput instanceof HTMLInputElement)) return;

    statusEl.textContent = "Sending...";
    statusEl.className = "text-site-muted text-sm";
    statusEl.style.color = "";

    try {
      const [{ initializeApp }, { getFirestore, collection, addDoc, serverTimestamp }] = await Promise.all([
        import("https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js"),
        import("https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"),
      ]);

      const firebaseConfig = {
        apiKey: "AIzaSyDGpcsvx1W4KSPw-sv26V3d52DN71rpA0I",
        authDomain: "hope-of-ai.firebaseapp.com",
        projectId: "hope-of-ai",
        storageBucket: "hope-of-ai.firebasestorage.app",
        messagingSenderId: "989934466246",
        appId: "1:989934466246:web:fcd4284745d8ff0c6913c7",
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      await addDoc(collection(db, "subscribers"), {
        email: emailInput.value,
        subscribedAt: serverTimestamp(),
      });

      form.reset();
      statusEl.textContent = "Got it. We'll reach out soon.";
      statusEl.className = "text-sm";
      statusEl.style.color = "#4f8a5b";
    } catch (error) {
      console.error(error);
      statusEl.textContent = "Something went wrong. Try again.";
      statusEl.className = "text-sm";
      statusEl.style.color = "#b5534a";
    }
  });
}
