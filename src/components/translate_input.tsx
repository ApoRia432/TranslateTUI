import { useState } from "react"
import type { TranslateText } from "../models/translate_text";

export const TranslateInput = () => {
    const TEXT_COLOR = "#00ffff";

    const [inputText, setInputText] = useState('');
    const [translates, setTranslates] = useState<TranslateText[]>([]);

    const onSubmit = () => {
        if (inputText === '') {
            return;
        }
        const err = Math.random() > 0.7 ? "エラーが発生しました" : undefined;
        setTranslates([...translates, {
            original: inputText,
            translated: "こんにちは",
            error: err,
        }])
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
