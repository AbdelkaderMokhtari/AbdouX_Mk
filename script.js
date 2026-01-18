document.addEventListener("DOMContentLoaded", () => {

  const html = document.documentElement;
  const themeButtons = document.querySelectorAll(".theme-toggle");

  // =========================
  // DARK / LIGHT MODE
  // =========================
  function updateIcons() {
    themeButtons.forEach(btn => {
      btn.innerHTML = html.classList.contains("dark")
        ? '<i class="fa-regular fa-sun"></i>'
        : '<i class="fa-regular fa-moon"></i>';
    });
  }

  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {
    html.classList.add("dark");
  }
  updateIcons();

  themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      html.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        html.classList.contains("dark") ? "dark" : "light"
      );
      updateIcons();
    });
  });

  /* =========================
     NAVBAR SCROLL
  ========================= */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("shadow-lg", window.scrollY > 50);
  });

  /* =========================
     MOBILE MENU
  ========================= */
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  let open = false;

  menuButton.addEventListener("click", () => {
    open = !open;
    mobileMenu.style.maxHeight = open ? mobileMenu.scrollHeight + "px" : "0";
    menuButton.innerHTML = open
      ? '<i class="fa-solid fa-x"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

});


const chatButton = document.getElementById("chat-button");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// Toggle chat window
chatButton.addEventListener("click", () => {
  chatWindow.classList.toggle("hidden");
  chatBody.scrollTop = chatBody.scrollHeight;
});
chatClose.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

// FAQ buttons
document.querySelectorAll(".faq-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    addUserMessage(btn.textContent);
    botReply(btn.textContent);
  });
});

// Send message
chatSend.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if (msg) {
    addUserMessage(msg);
    botReply(msg);
    chatInput.value = "";
  }
});

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") chatSend.click();
});

// Add user message
function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "chat-message user";
  div.textContent = text;
  chatBody.appendChild(div);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}

// Bot reply
function botReply(msg) {
  const div = document.createElement("div");
  div.className = "chat-message bot";

  // Full list of FAQs
  const faqs = {
    "Who are you?": "I am a front-end web developer, passionate about building web applications. I focus on creating modern, fast, and responsive interfaces, and I also work with Laravel.",
    "What do you do?": "I build responsive and interactive websites and web apps, focusing on front-end development with HTML, CSS, and JavaScript, and I also develop web applications using Laravel.",
    "What is your work experience?": "I have experience building web interfaces with HTML, CSS, and JavaScript, developing Laravel applications, dashboards, and reusable web templates, always applying best practices.",
    "What is your educational background?": "I am currently in the final year of a Bachelor's in Computer Science, while continuously improving my web development skills through hands-on projects.",
    "What are your technical skills?": "Frontend: HTML, CSS, JavaScript, Tailwind CSS, Bootstrap, responsive UI/UX. Backend: Laravel. Languages: JavaScript, PHP, basic Python, Java, C. Tools: Git, GitHub, code organization, converting designs to interfaces.",
    "What tools or technologies do you use?": "I use HTML, CSS, JavaScript, Tailwind CSS, Bootstrap for front-end development; Laravel for web applications; Git & GitHub for version control and collaboration.",
    "What sets you apart from other developers?": "I combine simplicity in design with quality execution, focusing on user experience, writing clean, scalable code, and continuously improving my skills.",
    "Can I see your projects?": "Yes, you can check my projects in the Projects section of this website or on my GitHub account. You can also contact me for more details.",
    "What is the best project you have worked on?": "One of my best projects was a complete Laravel web application for attendance management, focusing on organized data, user experience, and scalability.",
    "Do you work on personal projects?": "Yes, I constantly work on personal projects to improve my skills, experiment with new ideas, and prepare portfolio-ready work."
  };

  div.textContent = faqs[msg] || "Sorry, I don't understand that question.";
  chatBody.appendChild(div);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: "smooth" });
}
