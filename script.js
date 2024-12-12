document.getElementById("load-chat").addEventListener("click", function () {
    const fileInput = document.getElementById("file-input");
    const chatBox = document.getElementById("chat-box");

    if (!fileInput.files[0]) {
        alert("Please select a chat file!");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const lines = e.target.result.split("\n");
        chatBox.innerHTML = ""; // Clear previous chats

        lines.forEach(line => {
            const match = line.match(/(\d{2}\/\d{2}\/\d{2} \d{2}\.\d{2}) - ([^:]+): (.+)/);
            if (match) {
                const timestamp = match[1];
                const sender = match[2];
                const message = match[3];
                
                const chatDiv = document.createElement("div");
                chatDiv.classList.add("chat");

                const infoDiv = document.createElement("div");
                infoDiv.classList.add("info");
                infoDiv.textContent = `${sender} - ${timestamp}`;

                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message");

                // Assign different styles based on sender
                if (sender === "You") {
                    messageDiv.classList.add("sent");
                } else {
                    messageDiv.classList.add("received");
                    chatDiv.classList.add(sender.toLowerCase().replace(/\s/g, "-")); // Add a class based on sender's name
                }

                messageDiv.textContent = message;

                chatDiv.appendChild(infoDiv);
                chatDiv.appendChild(messageDiv);
                chatBox.appendChild(chatDiv);
            }
        });
    };

    reader.readAsText(fileInput.files[0]);
});
