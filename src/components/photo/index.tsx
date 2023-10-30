import { ImageLoaderProps, ImageProps } from 'next/image';
import { Image, Loader } from '@/styles/components/photo';
import { useEffect, useState } from 'react';

interface PhotoProps extends ImageProps {
    src: string;
};

const Photo = ({ src, alt, ...props }: PhotoProps) => {
    const [loading, setLoading] = useState(true);

    return (
        <>
            {loading && <Loader />}
            <Image 
                loader={(img: ImageLoaderProps) => img.src}
                src={src}
                alt={alt}
                unoptimized
                style={loading ? { filter: 'blur(10)' } : {}}
                onLoadingComplete={() => setLoading(false)}
                {...props}
            />
        </>
    );
}

export default Photo;