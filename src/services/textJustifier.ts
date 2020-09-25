const MAX_LINE_LENGTH = 80;

function leftJustify(words: string[], diff: number, i: number, j: number) {
	let res = words[i];

	for (let k = i + 1; k < j; ++k) {
		res += ' ' + words[k];
	}

  	return res;
}

function middleJustify(words: string[], diff: number, i: number, j: number) {
	let spacesNeeded = j - i - 1,
		spaces = diff / spacesNeeded,
		extraSpaces = diff % spacesNeeded,
		res = words[i];

	for (let k = i + 1; k < j; ++k) {
		let spacesToApply = spaces + (extraSpaces-- > 0 ? 1 : 0);
		res += ' '.repeat(spacesToApply) + words[k];
	}

	return res;
}
/**
 * "Justifies" a text to a limit of `MAX_LINE_LENGTH` (80) characters per line
 * @param text The provided text to be justified
 * @returns the justified text
 */
export function justify(text: string): string {
	const words = text.split(' ');

	let i = 0, n = words.length, res = '';

	while(i < n) {
		let j = i + 1, lineLength = words[i].length, newLine = false;

		while (j < n && (lineLength + words[j].length + (j - i - 1)) < MAX_LINE_LENGTH) {
			lineLength += words[j++].length;
		}

		let diff = MAX_LINE_LENGTH - lineLength;
		let numberOfWords = j - i;
		if (numberOfWords === 1 || j >= n) res += leftJustify(words, diff, i, j)
		else res += middleJustify(words, diff, i, j);
		res+='\n';
		i = j;
	}

	return res;
}
