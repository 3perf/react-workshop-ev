for (const button of document.querySelectorAll(".accordion__toggle")) {
  button.addEventListener("click", (event) => {
    const accordion = event.target.parentElement.parentElement;

    toggleAccordion(accordion);
  });
}

document
  .querySelector(".toolbar__toggle-all")
  .addEventListener("click", (event) => {
    for (const accordion of document.querySelectorAll(".accordion")) {
      toggleAccordion(accordion);
    }
  });

function toggleAccordion(accordion) {
  const accordionContent = accordion.querySelector(".accordion__content");

  const isVisible =
    !accordionContent.style.height || accordionContent.style.height !== "0px";
  if (isVisible) {
    accordionContent.style.height = "0px";
  } else {
    accordionContent.style.height = accordionContent.scrollHeight + "px";
  }
}
