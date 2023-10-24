export const zenkaku2Hankaku = (str: string) => {
    return str.replace(/[０-９]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
    });
};