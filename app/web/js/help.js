document.getElementById("helpForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll("input, select, textarea");
  const [nameEl, emailEl, helpTypeEl, urgencyEl, descEl, phoneEl] = inputs;

  const payload = {
    name: nameEl.value.trim(),
    email: emailEl.value.trim(),
    helpType: helpTypeEl.value,
    urgency: urgencyEl.value,
    description: descEl.value.trim(),
    phone: phoneEl.value.trim()
  };

  if (!payload.name || !payload.email || !payload.helpType || !payload.urgency || !payload.description) {
    alert("⚠️ Please fill all required fields.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/help", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Help request submitted successfully!");
      this.reset();
    } else {
      alert("❌ " + data.message);
    }
  } catch (err) {
    alert("❌ Could not connect to server. Make sure backend is running.");
  }
});