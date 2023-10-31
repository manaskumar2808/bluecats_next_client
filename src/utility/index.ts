export const isBase64 = (str: string) => {
    const base64Chars = /^[A-Za-z0-9+/]+={0,2}$/;
    return base64Chars.test(str);
}