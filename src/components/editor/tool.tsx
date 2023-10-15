import { ToolTypeEnum } from '@/constants';
import { Text, Container, TextContainer } from '@/styles/components/editor/tool';
import { EditorState as DraftEditorState } from 'draft-js';
import { useEffect } from 'react';

type ToolProps = {
    editorState: DraftEditorState,
    toolType: ToolTypeEnum;
    onClick?: Function;
}

const Tool = ({ editorState, toolType, onClick }: ToolProps) => {
    const inlineStyle = editorState?.getCurrentInlineStyle?.();

    const clickHandler = () => {
        onClick?.(toolType);
    }

    return (
        <Container onClick={clickHandler}>
            <TextContainer>
                <Text>
                    {toolType}
                </Text>
            </TextContainer>
        </Container>
    );
}

export default Tool;