/**
 * Serves the HTML frontend when the web app URL is visited.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
      .setTitle('Company Tech Readiness Assessment')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Pass-through of methods from other script files so they can be access by the frontend.
 */
function getQuestions() {
  const ss = SpreadsheetApp.openById("18oFiC2gu6azFaO1XHYFsSpVovBvz08s0hgg97Lu1LGY");
  const sheet = ss.getSheetByName("Sheet1");
  const data = sheet.getDataRange().getValues();
  
  const questions = [];
  
  // Loop through rows, skipping the header row (i = 0)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    
    const core = row[0];
    const category = row[1];
    const question = row[2];
    const lvl1 = row[3];
    const lvl2 = row[4];
    const lvl3 = row[5];
    const lvl4 = row[6];
    const tag = row[7];

    questions.push({
      id: tag,
      core: core,
      category: category,
      text: question,
      options: [
        { text: lvl1, value: 1 },
        { text: lvl2, value: 2 },
        { text: lvl3, value: 3 },
        { text: lvl4, value: 4}
      ]
    });
  }
  return questions;
}

function parseAssessment(formData) {
  const questions = getQuestions();
  const wccScores = [];
  questions.forEach(q => {
    wccScores.push({
      core: q.core,
      category: q.category,
      score: parseInt(formData[q.id], 10) || 0
    });
  });
  return wccScores;
}

/**
 * Processes form data, calculates scores, logs to a sheet, and returns recommendations.
 * @param {Object} formData - The data passed from the frontend form.
 * @return {Object} The assessment results.
 */
function processAssessment(formData) {
  // 1. Parse answers (1-4 scale for 15 questions)
  const wccScores = parseAssessment(formData); 

  return {
    scores: wccScores
  };
}
