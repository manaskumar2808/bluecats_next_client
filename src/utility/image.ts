import { publicRuntimeConfig as config } from '../../next.config';

export const getAspectRatio = (url: string): Promise<number> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
    
        img.addEventListener('load', () => {
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const aspectRatio = naturalHeight / naturalWidth;
            resolve(aspectRatio);
        });
    
        img.addEventListener('error', (error) => {
            console.error('Error loading image:', error);
            reject(error);
        });
    });
};

const isUrlPrefixed = (url: string, prefix: string) => {
    return url.startsWith(prefix);
}

export const getModifiedImageURL = (url: string | undefined, cdn: boolean | undefined) => {
    if(!url)
        return '';
    if(!cdn)
        return url;
    let updatedUrl = `${config?.DOMAIN_URL}/${url}`;
    return updatedUrl;
}