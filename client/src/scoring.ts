let rankNames = {
    0.1: "🥚Egg",
    0.25: "🐸Frog",
    0.4: "🐼Panda",
    0.6: "😸Cat",
    0.8: "🦧Orangutang",
    1: "🧑🏿‍🌾Human",
}

export function getScore(word: string, game: any): number {
    if (word.length == 4) return 1;
    if (game.pangrams.includes(word)) return word.length + 7;
    return word.length;
}

export function getRank(points: number, game: any): any {
    if (points === game.maxScore) {
        return ["🤖Robot", 0]
    }
    for (let percentage of Object.keys(rankNames).sort()) {
        let rankName = rankNames[percentage]
        if (points < Math.floor(parseFloat(percentage)*game.maxScore)) {
            return [rankName, Math.floor(parseFloat(percentage)*game.maxScore) - points]
        }
    }
    return [rankNames[1] || rankNames['1'], 0]
}