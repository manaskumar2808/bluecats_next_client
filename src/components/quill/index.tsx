import { Container } from '@/styles/components/editor/pages/quill';
import QuillNoSSRWrapper from '@/wrappers/quill-no-ssr-wrapper';
import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillInputProps {
    content: string;
    setContent: Function;
};

const QuillInput = ({ content, setContent }: QuillInputProps) => {
    const quill = useRef<ReactQuill>(null);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block', 'link', 'image'],
              
                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction
              
                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              
                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],
            ],
            handlers: {
              imageHandler: quillImageCallback
            },
            imageDrop: true,
            imageResize: {
                displayStyles: {
                    backgroundColor: 'black',
                    border: 'none',
                    color: 'white'
                },
                modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
            },
        }
    }), []);

    async function quillImageCallback() {
        console.log('quillImageCallback called!');

        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
    
        input.onchange = async () => {
          const file = input.files ? input.files[0] : null;
          let data = null;
          const formData = new FormData();
    
          const quillObj = quill?.current?.getEditor();
          const range = quillObj?.getSelection();
    
          if (file) {
            formData.append('file', file);
            formData.append('resource_type', 'raw');
    
            const responseUpload = await fetch(
              `${process.env.NEXT_PUBLIC_IMAGE_UPLOAD}/upload`,
              { method: 'POST', body: formData }
            );
    
            data = await responseUpload.json();
            if (data.error) {
              console.error(data.error);
            }

            if(range?.index)
                quillObj?.insertEmbed(range?.index, 'image', data?.secure_url);
          }
        };
    };

    return (
        <Container>
            <QuillNoSSRWrapper
                // @ts-ignore
                forwardedRef={quill}
                value={content}
                // @ts-ignore
                onChange={(content, delta, source, editor) => setContent(editor?.getHTML())}
                modules={modules}
                theme='snow'
                placeholder='Type your article...'
                style={{ height: '100%', fontSize: 18, boxSizing: 'border-box' }}
            />
        </Container>
    );
}

export default QuillInput;