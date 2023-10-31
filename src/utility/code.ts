export const getLanguageFromExtension = (extension: string) => {
    switch(extension) {
        case 'js':
            return 'javascript';
        case 'c++':
        case 'cpp':
            return 'cpp';
        case 'java':
            return 'java';
        case 'c':
            return 'c';
        case 'py':
            return 'python';
        case 'cs':
            return 'csharp';
        case 'html':
            return 'html';
        case 'css':
            return 'css';
        default:
            return 'javascript';
    }
}