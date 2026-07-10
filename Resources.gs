function getQuestions() {
  const ss = SpreadsheetApp.openById(
    "18oFiC2gu6azFaO1XHYFsSpVovBvz08s0hgg97Lu1LGY",
  );
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
        { text: lvl4, value: 4 },
      ],
    });
  }
  return questions;
}
