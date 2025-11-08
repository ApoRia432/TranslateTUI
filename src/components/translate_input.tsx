import { useEffect, useState } from "react"
import type { TranslateText } from "../models/translate_text";
import { apiTranslate } from "../api/translate";
import { geminiTranslate } from "../api/gemini";
import { TextAttributes } from "@opentui/core";

const DIRECT_TRANSLATION = process.env.TRANSLATETUI_DIRECT == "1";

export const TranslateInput = () => {
    const TEXT_COLOR = "#00ffff";

    const [inputText, setInputText] = useState('');
    const [translates, setTranslates] = useState<TranslateText[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTranslates(prev => prev.map((item) => item))
        }, 250);
        return () => clearInterval(interval);
    }, []);

    const translate = async (translateText: TranslateText) => {
        try {
            if (DIRECT_TRANSLATION) {
                translateText.translated = await geminiTranslate(translateText.original);
            } else {
                translateText.translated = await apiTranslate(translateText.original) || undefined;
            }
        } catch (e) {
            if (e instanceof Error) {
                translateText.error = e.message;
            } else {
                translateText.error = "エラーが発生しました。";
            }
        }
        setTranslates(prev =>
            prev.map(item =>
                item.id === translateText.id ? translateText : item
            )
        )
    }

    const onSubmit = () => {
        if (inputText === '') return;

        const translateText: TranslateText = {
            id: crypto.randomUUID(),
            original: inputText,
        };
        setTranslates([...translates, translateText]);
        translate(translateText);

        setInputText('');
    }
    return (
        <box width="100%" height="100%">
            {translates.length === 0 || (
                <scrollbox
                    stickyScroll={true}
                    stickyStart="bottom"
                    width="90%"
                    height="75%"
                    margin="auto"
                    backgroundColor="#222222"
                    padding={1}
                >
                    {translates.map((translateText) => (
                        <>
                            <text>You: {translateText.original}</text>
                            {translateText.error && (
                                <text fg="#ff0000">{translateText.error}</text>
                            )}
                            {!translateText.error && translateText.translated && (
                                <text fg="#00ff00">{translateText.translated}</text>
                            )}
                            {!translateText.error && !translateText.translated && (
                                <text attributes={TextAttributes.DIM}>{'.'.repeat(Math.floor(Date.now() / 1000) % 4 + 1)}</text>
                            )}
                            <text />
                        </>
                    ))}
                </scrollbox>
            )}
            <input
                placeholder="Enter text to translate..."
                textColor={TEXT_COLOR}
                height={2}
                width="90%"
                margin="auto"
                minWidth={12}
                focused
                value={inputText}
                onInput={setInputText}
                onSubmit={onSubmit}
                onPaste={(event) => setInputText(event.text)}
            />
        </box>
    )
}
