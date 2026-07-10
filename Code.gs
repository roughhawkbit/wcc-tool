/**
 * Serves the HTML frontend when the web app URL is visited.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile("Index")
    .setTitle("Company Tech Readiness Assessment")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
