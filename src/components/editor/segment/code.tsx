import { CodePayload, SegmentObj, SegmentType } from '@/constants/segment';
import { Container, Row, Language, Theme, Upload } from '@/styles/components/editor/segment/code';
import { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { LanguageOptions, ThemeOptions } from '@/constants/code';
import { getLanguageFromExtension } from '@/utility/code';
import CodeEditor from '@/components/code-editor';

interface CodeSegmentProps {
    segment: SegmentObj;
    onSegmentSave: Function;
}

const CodeSegment = ({ segment, onSegmentSave }: CodeSegmentProps) => {
    const payload = segment?.payload as CodePayload;
    const [code, setCode] = useState<string>(payload?.code || '');
    const [language, setLanguage] = useState<string>(payload?.language || 'javascript');
    const [theme, setTheme] = useState<string>(payload?.theme || 'light');
    const [file, setFile] = useState<any>();
    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        onCodeSegmentSave();
    }, [code, language, theme]);

    useEffect(() => {
        if (file) {
          var reader = new FileReader();
          reader.onload = async (e) => {
            setCode(e?.target?.result?.toString() as string || '');
          };
          reader.readAsText(file);
          const extension = file.name.split('.').pop() as string;
          const newLanguage = getLanguageFromExtension(extension);
          setLanguage(newLanguage);
        }
    }, [file]);

    const onCodeSegmentSave = async () => {
        const formData = new FormData();
        if(segment?.id)
            formData.append('id', segment?.id);
        formData.append('code', code);
        formData.append('language', language);
        formData.append('theme', theme);
        formData.append('type', SegmentType.CODE);
        await onSegmentSave(formData);
    }

    const uploadClickHandler = () => {
        fileInput?.current?.click();
    }

    const onUpload = (files: FileList | null) => {
        if(!files)
            return;
        const file = files?.[0];
        console.log('file', file);
        setFile(file);
    }

    return (
        <Container>
            <Row>
                <Language>
                    <DropdownButton id="language-dropdown-button" size='sm' title={language}>
                        {LanguageOptions.map(lang => <Dropdown.Item key={lang} onClick={() => setLanguage(lang)}>{lang}</Dropdown.Item>)}
                    </DropdownButton>
                </Language>
                <Theme>
                    <DropdownButton id="theme-dropdown-button" size='sm' title={theme}>
                        {ThemeOptions.map(th => <Dropdown.Item key={th} onClick={() => setTheme(th)}>{th}</Dropdown.Item>)}
                    </DropdownButton>
                </Theme>
                <Upload>
                    <Form.Group style={{ display: 'none' }}>
                        <Form.Control 
                            id="upload"
                            ref={fileInput}
                            onChange={e => onUpload((e?.target as HTMLInputElement).files)}
                            placeholder='Code file'
                            type="file"
                        />
                    </Form.Group>
                    <Button size='sm' onClick={uploadClickHandler}>Upload File</Button>
                </Upload>
            </Row>
            <CodeEditor 
                language={language}
                code={code}
                theme={theme}
                setCode={setCode}
            />
        </Container>
    );
}

export default CodeSegment;