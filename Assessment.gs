function parseAssessment(formData) {
  const questions = getQuestions();
  const wccScores = [];
  questions.forEach((q) => {
    wccScores.push({
      core: q.core,
      category: q.category,
      score: parseInt(formData[q.id], 10) || 0,
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
    scores: wccScores,
  };
}
