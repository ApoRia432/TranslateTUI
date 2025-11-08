import { useState } from "react"
import type { TranslateText } from "../models/translate_text";
import { apiTranslate } from "../api/trasnlate";

export const TranslateInput = () => {
    const TEXT_COLOR = "#00ffff";

    const [inputText, setInputText] = useState('');
    const [translates, setTranslates] = useState<TranslateText[]>([]);

    const translate = async(text: string) => {
        var translatedText = null;
        var err = undefined;
        try {
            translatedText = await apiTranslate(text);
        } catch (e) {
            if (e instanceof Error) {
                err = e.message;
            } else {
                err = "エラーが発生しました。";
            }
        }
        setTranslates([...translates, {
            original: text,
            translated: translatedText || undefined,
            error: err,
        }])
    }

    const onSubmit = () => {
        if (inputText === '') return;

        translate(inputText);

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
                        <box width="100%">
                            <text>You: {translateText.original}</text>
                            {translateText.error && (
                                <text fg="#ff0000">{translateText.error}</text>
                            )}
                            {!translateText.error && translateText.translated && (
                                <text fg="#00ff00">{translateText.translated}</text>
                            )}
                            <text />
                        </box>
                    ))}
                </scrollbox>
            )}
            <input
                placeholder="Type text to translate..."
                textColor={TEXT_COLOR}
                height={2}
                width="90%"
                margin="auto"
                minWidth={12}
                focused
                value={inputText}
                onInput={setInputText}
                onSubmit={onSubmit}
            />
        </box>
    )
}
