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

export const hasBulletCharacter = (text: string) => {
  if (/^\s*[*-•]/.test(text)) {
    return true;
  }
};

export const bulletCharacter = (text: string) => {
  let match = /^\s*([*-])/.exec(text);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};

// Parse after text on input (textarea)
// "Input filter"
export const parseInputText = (text: string): [string, number, boolean] => {
  let newText = text;

  let nLines = numberOfLines(newText);

  // Don't process if less than 2 lines or no characters
  if (nLines < 2 || newText.length < 1) {
    return [newText, 0, false];
  }

  // FIXME: There is an off-by-one error somewhere here (why is the previous line -2?)
  const previousLine = text.split('\n')[nLines - 2];
  console.log(text.split('\n'));

  let previousLineIndentLevel = indentLevel(previousLine);

  const lastChar = newText.charAt(newText.length - 1);

  // If last character was new line
  let addedIndent = false;
  if (lastChar === '\n') {
    if (previousLineIndentLevel > 0) {
      newText = newText.concat(' '.repeat(previousLineIndentLevel));
      addedIndent = true;
    }

    const bullet = bulletCharacter(previousLine);
    if (bullet) {
      newText = newText.concat(bullet + ' ');
      previousLineIndentLevel += 2;
      addedIndent = true;
    }
  }

  return [newText, previousLineIndentLevel, addedIndent];
};

