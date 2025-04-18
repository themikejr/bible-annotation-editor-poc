// BibleTextParser.js - Helper utility to convert plain Bible text to verse structure

function parseBibleText(plainText) {
  // Split the text into lines
  const lines = plainText.trim().split('\n');

  let result = '';
  let currentVerseNumber = 1;
  let inVerse = false;
  let verseText = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Check if this line starts with a verse number (e.g., "1. " or "12 ")
    const verseMatch = line.match(/^(\d+)[\.\s]/);

    if (verseMatch) {
      // If we were already parsing a verse, close it first
      if (inVerse && verseText) {
        result += `<div data-type="bible-verse" data-number="${currentVerseNumber}">\n${verseText}\n</div>\n\n`;
        verseText = '';
      }

      // Start a new verse
      currentVerseNumber = parseInt(verseMatch[1], 10);
      inVerse = true;
      // Extract the verse text without the number prefix
      verseText = line.replace(/^\d+[\.\s]/, '');
    } else if (inVerse) {
      // Continue with current verse
      verseText += ' ' + line;
    } else {
      // Treat as a heading or other non-verse content
      result += `<div class="bible-heading">${line}</div>\n\n`;
    }
  }

  // Add the last verse if there's one pending
  if (inVerse && verseText) {
    result += `<div data-type="bible-verse" data-number="${currentVerseNumber}">\n${verseText}\n</div>\n\n`;
  }

  return result;
}

// Example usage:
// const bibleHTML = parseBibleText(`
// Luke 21:34-36
// 
// 34 "Be careful, or your hearts will be weighed down with carousing, drunkenness and the anxieties of life, and that day will close on you suddenly like a trap.
// 35 For it will come on all those who live on the face of the whole earth.
// 36 Be always on the watch, and pray that you may be able to escape all that is about to happen, and that you may be able to stand before the Son of Man."
// `);

export default parseBibleText;
