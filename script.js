function handleSubmission() {
  const selectedAssetClass =
    document.querySelector('input[name="assetclass"]:checked');

  const errorMessage = document.getElementById("error-message");
  const messageBox = document.getElementById("message");

  if (!selectedAssetClass) {
    errorMessage.textContent = "Please select a financial instrument.";
    messageBox.textContent = "";
    return;
  }

  errorMessage.textContent = "";

  // ✅ THIS WAS MISSING / NOT EXECUTING BEFORE
  localStorage.setItem("PreferredInterest", selectedAssetClass.value);

  console.log(
    "✅ Stored in localStorage:",
    localStorage.getItem("PreferredInterest")
  );

  // AEP Data Layer push (unchanged)
  window.adobeDataLayer = window.adobeDataLayer || [];
  window.adobeDataLayer.push({
    event: "assetClassSelection",
    xdm: {
      eventType: "assetClassSelection",
      _accenture_partner: {
        Interest: {
          PreferredInterest: selectedAssetClass.value
        }
      }
    }
  });

  messageBox.textContent =
    `Thank you for selecting "${selectedAssetClass.value}".`;
}
