import { TextAttributes, createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { TranslateInput } from "./components/translate_input";

function App() {
    const Title = "Translate TUI";
    const Description = "A simple terminal-based translator"
    return (
        <box backgroundColor="#111111" width="100%" height="100%">
            <box height="25%" alignItems="center" justifyContent="flex-end" flexGrow={1} marginBottom={5}>
                <box justifyContent="center" alignItems="center">
                    <ascii-font font="tiny" text={Title} />
                    <text margin="auto" attributes={TextAttributes.DIM}>{Description}</text>
                </box>
            </box>
            <box alignItems="flex-start" width="100%" height="75%">
                <TranslateInput />
            </box>
        </box>
    );
}

const renderer = await createCliRenderer();
createRoot(renderer).render(<App />);
