import { Ingredient } from "interfaces";

export function zenkaku2Hankaku(str: string): string {
    return str.replace(/[０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
};

export function formatIngredients(ingredients: Ingredient[]): string {
    const maxCharacters = 25;
    let text = "";

    for (let i = 0; i < ingredients.length; i++) {
        const ingredientName = ingredients[i].name;
        if (text.length + ingredientName.length <= maxCharacters) {
            // 現在の文字列長 + ingredientName の長さが20文字以内の場合
            text += ingredientName;
        } else {
            // 20文字を超える場合、「...」で省略する
            text += `...`;
            break;
        }

        if (i < ingredients.length - 1) {
            text += "、";
        }
    }

    return text;
}