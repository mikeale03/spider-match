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
