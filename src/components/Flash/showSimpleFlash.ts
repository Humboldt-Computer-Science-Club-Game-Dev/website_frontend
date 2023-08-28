function showSimpleFlash(message: string) {
  const validationID = Math.random() * 100;
  window.localStorage.setItem("validationID", JSON.stringify(validationID));
  const simpleFlashContainer = document.querySelector(".flash_online_intakes");
  if (!simpleFlashContainer) return console.error("Could not find flash");
  const simpleFlash = simpleFlashContainer.querySelector(".inner-container");
  if (!simpleFlash) return console.error("Could not generate flash message");
  simpleFlashContainer?.classList?.remove("d-none");
  setTimeout(() => {
    simpleFlash?.classList?.add("shown");
  }, 100);

  const flashTextContainer = simpleFlash.querySelector(".flash_message");
  if (!flashTextContainer) return console.error("Could not find flash");
  flashTextContainer.textContent = message;

  setTimeout(() => {
    const currentValidationID = JSON.parse(
      window.localStorage.getItem("validationID") || ""
    );
    if (currentValidationID === validationID) {
      simpleFlash?.classList?.remove("shown");
      simpleFlashContainer?.classList?.add("d-none");
    }
  }, 5000);
}

export default showSimpleFlash;
