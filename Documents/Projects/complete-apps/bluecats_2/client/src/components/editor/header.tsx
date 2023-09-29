import { Container, Row } from "@/styles/components/editor/header";
import Tool from "./tool";
import { ToolTypeEnum } from "@/constants";
import { EditorState as DraftEditorState } from 'draft-js';

type EditorHeaderProps = {
    editorState: DraftEditorState,
    onClick: Function;
}

const EditorHeader = ({ editorState, onClick }: EditorHeaderProps) => {
    return (
        <Container>
            <Row>
                <Tool editorState={editorState} toolType={ToolTypeEnum.BOLD} onClick={onClick} />
            </Row>
        </Container>
    );
}

export default EditorHeader;