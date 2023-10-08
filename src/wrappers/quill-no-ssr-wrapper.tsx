import dynamic from "next/dynamic";
// // @ts-ignore
// import ImageResize from 'quill-image-resize-module-react';
// // @ts-ignore
// import { ImageDrop } from 'quill-image-drop-module';

const QuillNoSSRWrapper = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill');
        window.Quill = RQ?.Quill || {};
        // RQ.Quill.register('modules/imageResize', ImageResize);
        // RQ.Quill.register('modules/imageDrop', ImageDrop);
        // @ts-ignore
        return ({ forwardedRef, ...props }) => <RQ ref={forwardedRef} {...props} />;
    },
    { ssr: false }
);

QuillNoSSRWrapper.displayName = 'QuillNoSSRWrapper';

export default QuillNoSSRWrapper;