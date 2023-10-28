import { SegmentType } from '@/constants/segment';
import AddIcon from '@/icons/add';
import CodeIcon from '@/icons/code';
import ImageIcon from '@/icons/image';
import TextAreaIcon from '@/icons/text-area';
import { Container, Row, AddButton, AddIconContainer } from '@/styles/components/editor/segment-selector';
import { useState } from 'react';

interface SegmentSelectorProps {
    onAddSegment: Function;
};

const SegmentSelector = ({ onAddSegment }: SegmentSelectorProps) => {
    const [showSegmentOptions, setShowSegmentOptions] = useState(false);

    const iconColor = '#5f5f5f';
    const iconSize = 15;

    const segmentOptions = [
        { id: 'segment00', title: 'Text', type: SegmentType.TEXT, Icon: TextAreaIcon },
        { id: 'segment01', title: 'Media', type: SegmentType.MEDIA, Icon: ImageIcon },
        { id: 'segment02', title: 'Code', type: SegmentType.CODE, Icon: CodeIcon },
    ];

    const toggleSegmentOptions = () => {
        setShowSegmentOptions(prevShowSegmentOptions => !prevShowSegmentOptions);
    }

    return (
        <Container>
            <Row>
                <AddButton rotate={showSegmentOptions} onClick={toggleSegmentOptions}>
                    <AddIconContainer>
                        <AddIcon color={iconColor} size={iconSize} style={{ height: iconSize, width: iconSize }} />
                    </AddIconContainer>
                </AddButton>
                {showSegmentOptions && segmentOptions.map(({ id, type, Icon }) => (
                    <AddButton rotate={false} key={id} onClick={() => onAddSegment(type)}>
                        <AddIconContainer>
                            <Icon color={iconColor} size={iconSize} />
                        </AddIconContainer>
                    </AddButton>
                ))}
            </Row>
        </Container>
    );
}

export default SegmentSelector;