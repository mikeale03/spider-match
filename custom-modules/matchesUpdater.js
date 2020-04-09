export const matchResetMark = (matches) => {
    return matches.map((item) => {
        return { ...item, isMarked:false };
    });
}

export const deleteMarked = (matches) => {
    let markedItem = [];
    const newMatches = matches.filter((item) => {
        if (item.isMarked) {
            markedItem.push(item);
            return false;
        } else return true;
    });
    return {matches: newMatches, markedItem};
}

export const markAll = (matches) => {
    const newMatches = matches.map((item) => {
        return {...item, isMarked:true};
    });
    return newMatches;
}