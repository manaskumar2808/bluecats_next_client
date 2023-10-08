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