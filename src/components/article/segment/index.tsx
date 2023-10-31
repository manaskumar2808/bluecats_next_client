import { SegmentObj, SegmentType } from "@/constants/segment";
import ArticleTextSegment from "./text";
import ArticleMediaSegment from "./media";
import ArticleCodeSegment from "./code";

interface ArticleSegmentProps {
    segment: SegmentObj;
};

const ArticleSegment = ({ segment }: ArticleSegmentProps) => {
    switch(segment?.type) {
        case SegmentType.TEXT:
            return <ArticleTextSegment segment={segment} />
        case SegmentType.MEDIA:
            return <ArticleMediaSegment segment={segment} />
        case SegmentType.CODE:
            return <ArticleCodeSegment segment={segment} />
        default:
            return <ArticleTextSegment segment={segment} />
    }
}

export default ArticleSegment;