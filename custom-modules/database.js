import * as SQLite from 'expo-sqlite';
import * as SQLBuilder from './sqlBuilder';

const db = SQLite.openDatabase('db.db');

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
                    reject('error'); 
                }
            );
        });
    })
}

export const createSpidersTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                SQLBuilder.createSpidersTable(),
                [],
                ( _, res) => {
                    resolve('created');
                },
                ( _, err) => { 
                    reject('error'); 
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
                    resolve(res.rows);
                },
                ( _, err) => { 
                    reject('error'); 
                }
            );
        });
    })
}

export const insertIntoTable = (table, valuesObj) => {
    const columns = Object.getOwnPropertyNames(valuesObj);
    const values = columns.map((column) => valuesObj[column]);
    const sql = SQLBuilder.insertIntoTable(table, columns);
    console.log(sql);
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql,
                values,
                ( _, res) => {
                    resolve(res);
                },
                ( _, err) => { 
                    reject('error'); 
                }
            );
        });
    })
}