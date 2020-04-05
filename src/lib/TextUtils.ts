export const indentLevel = (text: string): number => {
  let i;
  for (i = 0; i < text.length; i++) {
    if (!/\s/.test(text.charAt(i))) {
      break;
    }
  }

  return i;
};

// Index of the last line in the string
export const numberOfLines = (text: string): number => {
  return text.split('\n').length;
};

export const hasBulletCharacter = (text: string): boolean => {
  if (/^\s*([*-])/.test(text)) {
    return true;
  }
  return false;
};

export const bulletCharacter = (text: string): string => {
  let match = /^\s*([*-])/.exec(text);
  if (match && match[1]) {
    return match[1];
  }
  return '';
};

export const lineNumberAtPosition = (text: string, position: number): number => {
  // Count from position backwards to zero.
  // The number of newlines we see along the way
  // is the number of lines that there are, minus 1 (so it's 0-indexed for us)
  let nNewlines = 0;
  for (let i = position; i <= 0; i -= 1) {
    if (text.charAt(position) === '\n') {
      nNewlines += 1;
    }
  }
  return nNewlines;
};

export const positionOfLineEnd = (text: string, position: number): number => {
  let i;
  for (i = position; i < text.length; i++) {
    if (text.charAt(i) === '\n') {
      break;
    }
  }
  return i;
};

export const positionOfLineStart = (text: string, position: number): number => {
  let i;
  for (i = position - 1; i >= 0; i--) {
    if (text.charAt(i) === '\n') {
      break;
    }
  }
  return i + 1;
};

export const lineAtPosition = (text: string, position: number): string => {
  return splitLines(text)[lineNumberAtPosition(text, position)];
};

export const splitLines = (text: string): string[] => {
  return text.split('\n');
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

  // `-2` because: `-1` would normally be the last line.
  // When the character in the split IS the last character in the string,
  // then an empty string is appended to the end of the array returned by `split`
  const previousLine = text.split('\n')[nLines - 2];

  let previousLineIndentLevel = indentLevel(previousLine);

  const lastChar = newText.charAt(newText.length - 1);

  // If last character was new line
  let addedIndent = false;

  // Don't add a bullet if the last line was just a bullet
  let lastLineJustBullet = previousLine.endsWith('- ');

  if (lastChar === '\n' && !lastLineJustBullet) {
    if (previousLineIndentLevel > 0) {
      newText = newText.concat(' '.repeat(previousLineIndentLevel));
      addedIndent = true;
    }

    if (hasBulletCharacter(previousLine)) {
      const bullet = bulletCharacter(previousLine);
      newText = newText.concat(bullet + ' ');
      previousLineIndentLevel += 2;
      addedIndent = true;
    }
  }

  return [newText, previousLineIndentLevel, addedIndent];
};
