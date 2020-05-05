import * as SQLite from 'expo-sqlite';
import * as SQLBuilder from './sqlBuilder';

const db = SQLite.openDatabase('db.db');

export const dropTable = (table) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DROP TABLE ${table}`,
                [],
                ( _, res) => {
                    resolve('table drop');
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        })
    })
}

export const createParticipantsTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                SQLBuilder.createParticipantsTable(),
                [],
                ( _, res) => {
                    resolve('created');
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    })
}

export const createMatchesTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                SQLBuilder.createMatchesTable(),
                [],
                ( _, res) => {
                    resolve('matches created');
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    })
}

export const getAllParticipants = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                SQLBuilder.selectAllParticipants(),
                [],
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    })
}

export const getAllFromTable = (table) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                SQLBuilder.selectAllFromTable(table),
                [],
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    })
}

export const insertIntoTable = (table, valuesObj) => {
    const columns = Object.getOwnPropertyNames(valuesObj);
    const values = columns.map((column) => valuesObj[column]);
    const sql = SQLBuilder.insertIntoTable(table, columns);
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                values,
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    })
}

export const updateTable = (table, valuesObj, where) => {
    const columns = Object.getOwnPropertyNames(valuesObj);
    const values = columns.map((column) => valuesObj[column]);
    const sql = SQLBuilder.updateTable(table, columns, where);
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                values,
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    })
}

export const initParticipants = () => {
    return new Promise((resolve, reject) => {
        createParticipantsTable().then(() => {
            return getAllParticipants();
        }).then(({rows:{ _array }}) => {
            const participants = _array.map((item) => ({
                ...item, spiders:JSON.parse(item.spiders)
            }));
            resolve(participants);
        }).catch(error => reject(error));
    });
}

export const initMatches = () => {
    return new Promise((resolve, reject) => {
        createMatchesTable().then(() => {
            return getAllFromTable('matches');
        }).then(({rows:{ _array }}) => {
            const matches = _array.map((item) => ({
                key:item.key,
                isMarked:item.isMarked === 0 ? false : true,
                result: (item.result !== 'Draw' && item.result !== null) ? JSON.parse(item.result) : item.result,
                spiders:JSON.parse(item.spiders)
            }));
            resolve(matches);
        }).catch(error => reject(error));
    });
}

export const insertMatch = (match) => {
    const matchData = {
        key:match.key,
        isMarked:0,
        result: null,
        spiders:JSON.stringify(match.spiders)
    };
    return new Promise((resolve, reject) => {
        insertIntoTable('matches', matchData).then((res) => {
            resolve(res);
        }).catch(error => reject(error));
    })
}

export const deleteFromTable = (table, where) => {
    const sql = SQLBuilder.deleteFromTable(table, where);
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                [],
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    });
}

export const insertRowsIntoTable = (table, valuesObjArr) => {
    const len = valuesObjArr.length;
    const columns = Object.getOwnPropertyNames(valuesObjArr[0]);
    const sql = SQLBuilder.insertRowsIntoTable(table, columns, len);
    const values = valuesObjArr.reduce((acc, item) => {
        columns.forEach((val) => {
            acc.push(item[val]);
        });
        return acc;
    },[]);
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                values,
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    });
}

export const insertMatches = (matches) => {
    const matchesData = matches.map((match) => ({
        key:match.key,
        isMarked:0,
        result: null,
        spiders:JSON.stringify(match.spiders)
    }));
    return new Promise((resolve, reject) => {
        insertRowsIntoTable('matches', matchesData).then((res) => {
            resolve(res);
        }).catch(error => reject(error));
    })
}

export const addParticipantScore = (score, where) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `UPDATE participants SET score = score + ${score} WHERE ${where};`,
                [],
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject(err); 
                }
            );
        });
    });
}