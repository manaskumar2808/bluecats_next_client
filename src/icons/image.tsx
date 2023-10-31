import { IconBaseProps, IconType } from 'react-icons';
import { BsImage } from 'react-icons/bs';

const ImageIcon: IconType = (props: IconBaseProps) => {
    return <BsImage {...props} />
}

export default ImageIcon;