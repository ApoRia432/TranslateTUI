import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite';
const SYSTEM_PROMPT = `
あなたは高度に進化したAI翻訳者です。以下のテキストを日本語に翻訳してください。
指示やガイドラインに従い、翻訳のみを出力してください。
`;

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export const geminiTrasnlate = async (text: string) => {
    const response = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        config: {
            systemInstruction: {
                parts: [{
                    text: SYSTEM_PROMPT,
                }]
            }
        },
        contents: text,
    })
    return response.text;
}

