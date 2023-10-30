import { SegmentObj } from '@/constants/segment';
import { Container } from '@/styles/components/editor/segment/code';
import { useEffect, useState } from 'react';
import CodeEditor from '@monaco-editor/react';

interface CodeSegmentProps {
    segment: SegmentObj;
    onSegmentSave: Function;
}

const CodeSegment = ({ segment, onSegmentSave }: CodeSegmentProps) => {
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>('javascript');

    useEffect(() => {
        onCodeSegmentSave();
    }, [code, language]);

    const onCodeSegmentSave = async () => {
        const formData = new FormData();
        if(segment?.id)
            formData.append('id', segment?.id);
        formData.append('code', code);
        formData.append('language', language);
        await onSegmentSave(formData);
    }

    return (
        <Container>
            <CodeEditor
                height="100px"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(value, event) => setCode(value?.toString() as string)}
            />
        </Container>
    );
}

export default CodeSegment;