export const indentLevel = (text: string) => {
  let i;
  for (i = 0; i < text.length; i++) {
    if (!/\s/.test(text.charAt(i))) {
      break;
    }
  }

  return i;
};

// Index of the last line in the string
export const numberOfLines = (text: string) => {
  return text.split('\n').length;
};

// Parse after text on input (textarea)
// "Input filter"
export const parseInputText = (text: string): string => {
  let newText = text;

  let nLines = numberOfLines(newText);

  // Don't process if less than 2 lines or no characters
  if (nLines < 2 || newText.length < 1) {
    return newText;
  }

  // FIXME: There is an off-by-one error somewhere here (why is the previous line -2?)
  const previousLine = text.split('\n')[nLines - 2];

  const previousLineIndentLevel = indentLevel(previousLine);

  const lastChar = newText.charAt(newText.length - 1);

  // If last character was new line
  if (lastChar === '\n') {
    if (previousLineIndentLevel > 0) {
      newText = newText.concat(' '.repeat(previousLineIndentLevel));
    }
  }

  return newText;
};

