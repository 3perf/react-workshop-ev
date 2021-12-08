for (const button of document.querySelectorAll(".accordion__toggle")) {
  button.addEventListener("click", (event) => {
    const accordion = event.target.parentElement.parentElement;

    toggleAccordion(accordion);
  });
}

document.querySelector(".toolbar__toggle-all").addEventListener("click", () => {
  const accordionHeights = [];
  const accordions = document.querySelectorAll(".accordion");
  // All reads in one place
  for (const accordion of accordions) {
    accordionHeights.push(
      accordion.querySelector(".accordion__content").scrollHeight
    );
  }

  // All writes in one place
  for (let i = 0; i < accordions.length; i++) {
    const contentHeight = accordionHeights[i];

    const accordionContent = accordions[i].querySelector(".accordion__content");

    const isVisible =
      !accordionContent.style.height || accordionContent.style.height !== "0px";
    if (isVisible) {
      accordionContent.style.height = "0px";
    } else {
      accordionContent.style.height = contentHeight + "px";
    }
  }
});

function toggleAccordion(accordion) {
  const accordionContent = accordion.querySelector(".accordion__content");

  const isVisible =
    !accordionContent.style.height || accordionContent.style.height !== "0px";
  if (isVisible) {
    accordionContent.style.height = "0px";
  } else {
    const contentHeight = accordionContent.scrollHeight;
    accordionContent.style.height = contentHeight + "px";
  }
}
