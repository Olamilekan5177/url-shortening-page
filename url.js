// const apiKey = "a8d271842abf497c8e5252a70112fd99"; // Replace with your Rebrandly API key
// const apiUrl = "https://api.rebrandly.com/v1/links";

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("urlForm");
//   const shortUrlDisplay = document
//     .getElementById("shortUrl");
//   const copyButton = document.getElementById("copyButton");
//   const inputField = document.getElementById("longUrl");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();
//     const longUrl = document.getElementById("longUrl").value;

//     // Create a new XMLHttpRequest object
//     const xhr = new XMLHttpRequest();

//     // Configure it: POST request, API endpoint, asynchronous
//     xhr.open("POST", apiUrl, true);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.setRequestHeader("apikey", apiKey);

//     // Set up callback for when request completes
//     xhr.onload = function () {
//       if (xhr.status >= 200 && xhr.status < 300) {
//         const response = JSON.parse(xhr.responseText);
//         const shortUrl = response.shortUrl;
//         shortUrlDisplay.innerHTML = `<strong>Shortened URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
//       } else {
//         console.error("Error shortening URL:", xhr.statusText);
//         shortUrlDisplay.textContent =
//           "Error: Failed to shorten URL. Please try again later.";
//       }
//     };

//     // Handle network errors
//     xhr.onerror = function () {
//       console.error("Network error occurred while trying to reach the API.");
//       shortUrlDisplay.textContent =
//         "Error: Failed to connect to the API. Please try again later.";
//     };

//     // Send the request
//     const data = JSON.stringify({
//       destination: longUrl,
//       domain: { fullName: "rebrand.ly" }, // Optional: Specify a custom domain if configured in Rebrandly
//     });
//     xhr.send(data);
//   });
// });

const apiKey = "a8d271842abf497c8e5252a70112fd99"; // Replace with your Rebrandly API key
const apiUrl = "https://api.rebrandly.com/v1/links";



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("urlForm");
  const shortUrlDisplay = document.getElementById("shortUrl");
  const copyButton = document.getElementById("copyButton");
  const inputField = document.getElementById("longUrl");
  const showLongUrl = document.getElementById("showLongUrl");
  const shortlinkDiv = document.querySelector(".shortlink");
  const urlRegex =
    /^((http|https):\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  const linkError = document.getElementById("linkError");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const longUrl = inputField.value.trim();
   document.getElementById ("form")
    if (validateForm ()) {
      document.getElementById("form").reset();
      document.querySelector("but")(function (input) {
        input.classList.remove("valid", "invalid");
      });
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("apikey", apiKey);

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = JSON.parse(xhr.responseText);
        const shortUrl = response.shortUrl;
        shortUrlDisplay.innerHTML = `<strong>Shortened URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
        shortUrlDisplay.style.display = "block"; // Make sure the display is set to block to show the shortened URL
        copyButton.disabled = false; // Enable the copy button once the URL is shortened
      } else {
        console.error("Error shortening URL:", xhr.statusText);
        shortUrlDisplay.textContent =
          "Error: Failed to shorten URL. Please try again later.";
        shortUrlDisplay.style.display = "block"; // Show error message
      }
    };

    xhr.onerror = function () {
      console.error("Network error occurred while trying to reach the API.");
      shortUrlDisplay.textContent =
        "Error: Failed to connect to the API. Please try again later.";
      shortUrlDisplay.style.display = "block"; // Show error message
    };

    const data = JSON.stringify({
      destination: longUrl,
      domain: { fullName: "rebrand.ly" },
    });
    xhr.send(data);
  });

  copyButton.addEventListener("click", function () {
    const shortUrlText = shortUrlDisplay.querySelector("a").textContent;

    // Use navigator.clipboard.writeText() to copy text to clipboard
    navigator.clipboard
      .writeText(shortUrlText)
      .then(() => {
        // Change button text to "Copied!" and disable it temporarily
        copyButton.textContent = "Copied!";
        copyButton.disabled = true;
        copyButton.style.backgroundColor = "hsl(252, 91%, 4%)"; // Copied color

        // Reset button text after a short delay
        setTimeout(() => {
          copyButton.textContent = "Copy";
          copyButton.disabled = false;
          copyButton.style.backgroundColor = "hsl(180, 66%, 49%)"; // Reset to default color
        }, 2000); // Reset after 2 seconds (adjust as needed)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy short URL. Please try again.");
      });
  });
  // Add event listener to update output on input change
  inputField.addEventListener("input", function () {
    // Update the output field with the input value
    showLongUrl.textContent = inputField.value;
  });
  
inputField.addEventListener("input", function () {
  const longUrl = inputField.value.trim();
  showLongUrl.textContent = longUrl;

  if (longUrl !== "") {
    shortlinkDiv.classList.remove("hidden");
  } else {
    shortlinkDiv.classList.add("hidden");
  }
});

function validateForm() {
  if (!urlRegex.test(inputField)) {
    linkError.textContent = "Invalid email address.";
    inputField.classList.add("invalid");
    inputField.classList.remove("valid");
    return false;
  } else {
    linkError.textContent = "";
    linkInput.classList.add("valid");
    linkInput.classList.remove("invalid");
    return true;
  }
}
 
});
