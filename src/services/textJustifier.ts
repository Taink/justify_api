class Line {
    private words: string[];
    public static readonly MAX_LINE_LENGTH = 80;

    constructor() {
        this.words = [];
    }

    public getLineLength(): number {
        return this.words.join('').length;
    }

    public getWordsCount(): number {
        return this.words.length;
    }

    public appendWord(word: string): void {
        this.words.push(word);
    }

    public toString(): string {
        let charNbrDiff = Line.MAX_LINE_LENGTH - this.getLineLength(),
            requiredSpaces = this.getWordsCount() - 1,
            spaces = Math.floor(charNbrDiff / requiredSpaces),
            extraSpaces = charNbrDiff % requiredSpaces,
            res = this.words.join(' '.repeat(spaces));
        for (let i = 0; i < extraSpaces; i++) {
            res
        }
        return res;
    }
}

function makeLines(words: string[]): Line[] {
    let lines: Line[] = [];



    return lines;
}

export function justify(text: string): string {
    const lines = makeLines(text.split(' '));

    return lines.join('\n');
}

let text = 'fze fhq fzqehf qzheu zqhefuzequf hzqqfiuze hfuizqh efzqeuf huizfuhzqeuifhzqu hfizqehfiu hzqfuizqhefiuh zquhf zqeuifh qizhfuizqehiuf hzquf huizeqh fizqh fuizqh ezqeuifhuizq heh uqhz ehfiuhze hfuzqh huizqeh uihui qzhu hzuqehui huhue zqu uhi uhihui zehuq uh huiiu';

console.log(justify(text));