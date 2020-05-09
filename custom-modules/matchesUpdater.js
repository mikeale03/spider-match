import * as DB from './database';

export const matchResetMark = (matches) => {
    return new Promise((resolve, reject) => {
        DB.updateTable('matches', {isMarked: 0}, 'isMarked = 1').then((result) => {
            console.log(result);
            resolve(matches.map((item) => {
                return { ...item, isMarked:false };
            }));
        }).catch((error) => {
            reject(error);
        })
    })
}

export const deleteMarked = (matches) => {
    let markedItem = [];
    const newMatches = matches.filter((item) => {
        if (item.isMarked) {
            markedItem.push(item);
            return false;
        } else return true;
    });
    return {newMatches, markedItem};
}

export const markAll = (matches) => {
    return new Promise((resolve, reject) => {
        DB.updateTable('matches',{isMarked:1}, `isMarked = 0`).then((result) => {
            console.log(result);
            resolve(matches.map((item) => {
                return {...item, isMarked:true};
            }));
        }).catch(error => reject(error));
    });
}

export const mark = (matches, match) => {
    const data = {
        isMarked: match.isMarked ? 0 : 1
    }
    return new Promise((resolve, reject) => {
        DB.updateTable('matches', data, `key = ${match.key}`).then((result) => {
            console.log(result);
            resolve(matches.map((item) => {
                return ( item.key === match.key ? {...item, isMarked: !match.isMarked} : item )
            }));
        }).catch(error => reject(error));
    });
}