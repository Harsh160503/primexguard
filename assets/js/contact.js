document.querySelector(".contact-modern-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  let status = this.querySelector(".form-status");
  if (!status) {
    status = document.createElement("p");
    status.className = "form-status";
    status.style.marginTop = "10px";
    this.appendChild(status);
  }

  const data = {
    name: this.querySelector('input[placeholder="Jordan Walk"]').value,
    email: this.querySelector('input[type="email"]').value,
    subject: this.querySelector('input[placeholder="write your subject"]').value,
    message: this.querySelector("textarea").value
  };

  status.style.color = "#2f6bff";
  status.textContent = "Sending...";

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      throw new Error("Server error");
    }

    status.style.color = "green";
    status.textContent = "✅ Message sent successfully!";
    this.reset();

  } catch (err) {
    console.error("Contact form error:", err);
    status.style.color = "red";
    status.textContent = "❌ Failed to send. Please try again.";
  }
});
