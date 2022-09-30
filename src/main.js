const btns = document.querySelector(".buttons");
const textContent = document.querySelectorAll(".content");
const copyButtons = document.querySelectorAll(".copy");
const pasteSentences = document.querySelectorAll(".paste");
let textPlaceholder = "_ _ _ _ _ _ _ _ _ _";
let selectedContent = "";
let previousSource = "";

// Detect the click if it is not the issued buttons
window.addEventListener("mouseup", (event) => {
  if (event.target.innerText !== textPlaceholder) {
    copyButtons.forEach((item) => {
      item.classList.remove("selected");
    });
    selectedContent = "";
    previousSource = "";
  }
});

function buttonClickHandler(event, content) {
  if (event) {
    // reset the rest of the buttons
    copyButtons.forEach((item) => item.classList.remove("selected"));

    // toggle the issued button
    event.target.classList.toggle("selected");
    previousSource = event.target.getAttribute("data-item");
    selectedContent = content;
  }
}

// Copy content to clipboard
// All the clickable buttons
copyButtons.forEach((copyButton, index) => {
  const content = textContent[index].innerText;

  // inload global settings
  previousSource = copyButton.setAttribute("data-item", index);

  // Clicked button
  copyButton.addEventListener("click", (event) =>
    buttonClickHandler(event, content)
  );
});

// Paste content from clipboard
pasteSentences.forEach((pasteSentence) => {
  pasteSentence.addEventListener("click", (event) => {
    if (event.target.innerText === textPlaceholder && selectedContent !== "") {
      event.target.innerText = selectedContent;
      document.querySelector(`[data-item="${previousSource}"]`).remove();
      event.target.setAttribute("data-item", previousSource);
      selectedContent = "";
    } else if (
      event.target.innerText === textPlaceholder &&
      selectedContent === ""
    ) {
      btns.classList.add("highlighted");
      setInterval(() => {
        btns.classList.remove("highlighted");
      }, 1000);
    } else if (event.target.hasAttribute("data-item")) {
      // Take back the element

      const newButton = document.createElement("button");
      newButton.classList.add("copy");
      newButton.classList.add("content");
      newButton.setAttribute(
        "data-item",
        event.target.getAttribute("data-item")
      );
      newButton.innerText = event.target.innerText;
      newButton.addEventListener("click", (event) =>
        buttonClickHandler(event, event.target.innerText)
      );

      btns.appendChild(newButton);

      // Restore the previus element content
      event.target.innerText = textPlaceholder;
      event.target.removeAttribute("data-item");
    }
  });
});
