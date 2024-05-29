const form = document.querySelector("form");
const fileInput = document.getElementById("file-input");
const responseEl = document.getElementById("response");
const messageBtn = document.getElementById("message-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  messageBtn.disabled = true;
  messageBtn.innerHTML = "Sending...";

  const file = fileInput.files[0];

  if (!file) {
    responseEl.innerHTML = "Please select a file.";
    messageBtn.disabled = false;
    messageBtn.innerHTML = "Send";
    return;
  }

  const reader = new FileReader();

  reader.onloadend = async () => {
    const base64String = reader.result;
    console.log("Base64 string:", base64String);

    const data = {
      uploads: [
        {
          data: base64String,
          type: "file",
          name: file.name,
          mime: file.type,
        },
      ],
    };

    console.log("Data to send:", data);

    try {
      const res = await fetch("/api/flowise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Result from server:", result);

      responseEl.innerHTML = result.message.text ? result.message.text : JSON.stringify(result.message, null, 2);
    } catch (error) {
      responseEl.innerHTML = error.message;
    } finally {
      messageBtn.disabled = false;
      messageBtn.innerHTML = "Send";
      fileInput.value = "";
    }
  };

  reader.readAsDataURL(file);
});
