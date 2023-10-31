import { SegmentObj, SegmentType } from '@/constants/segment';
import MediaSegment from './media';
import TextSegment from './text';
import CodeSegment from './code';
import { Container, ActionContainer, TrashIconContainer, TrashIconWrapper } from '@/styles/components/editor/segment';
import TrashIcon from '@/icons/trash';

interface SegmentProps {
    segment: SegmentObj;
    onSegmentSave: Function;
    onSegmentDelete: Function;
}

const Segment = ({ segment, onSegmentSave, onSegmentDelete }: SegmentProps) => {
    const iconSize = 17;
    const iconColor = 'red';

    let SegmentComponent;
    switch(segment?.type) {
        case SegmentType.MEDIA:
            SegmentComponent = <MediaSegment segment={segment} onSegmentSave={onSegmentSave} />
            break;
        case SegmentType.TEXT:
            SegmentComponent = <TextSegment segment={segment} onSegmentSave={onSegmentSave} />
            break;
        case SegmentType.CODE:
            SegmentComponent = <CodeSegment segment={segment} onSegmentSave={onSegmentSave} />
            break;
        default:
            SegmentComponent = <TextSegment segment={segment} onSegmentSave={onSegmentSave} />
            break;
    }

    return (
        <Container>
            {SegmentComponent}
            <ActionContainer>
                <TrashIconContainer onClick={() => onSegmentDelete(segment?.id)}>
                    <TrashIconWrapper>
                        <TrashIcon size={iconSize} color={iconColor} />
                    </TrashIconWrapper>
                </TrashIconContainer>
            </ActionContainer>
        </Container>
    );
}

export default Segment;