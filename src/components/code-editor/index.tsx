import MonacoEditor from '@monaco-editor/react';
import { Container } from '@/styles/components/code-editor';

interface CodeEditorProps {
    language: string;
    theme: string;
    code: string;
    setCode?: Function;
    readOnly?: boolean;
};

const CodeEditor = ({ language, theme, code, setCode, readOnly }: CodeEditorProps) => {
    return (
        <Container>
            <MonacoEditor
                height="200px"
                defaultLanguage={language || 'javascript'}
                language={language}
                theme={theme}
                value={code}
                onChange={(value) => setCode?.(value?.toString() as string)}
                options={{ 
                    padding: { top: 20, bottom: 20 }, 
                    cursorBlinking: 'blink',
                    bracketPairColorization: {
                        enabled: true,
                    },
                    autoClosingQuotes: 'always',
                    fontSize: 15,
                    letterSpacing: 1.5,
                    readOnly,
                }}
            />
        </Container>
    );
}

export default CodeEditor;