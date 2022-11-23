export const getISODate = (offset?: number): string => {
    if (!offset) {
        return new Date().toISOString().split('T')[0];
    }
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toISOString().split('T')[0];
};
