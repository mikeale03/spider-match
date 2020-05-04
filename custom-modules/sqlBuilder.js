export const createParticipantsTable = () => {
    return (
        `CREATE TABLE IF NOT EXISTS "participants" (
            "key"	TEXT NOT NULL UNIQUE,
            "name"	TEXT,
            "image"	TEXT,
            "score"	TEXT,
            "alliesKey"	TEXT,
            "spiders"	TEXT NOT NULL,
            PRIMARY KEY("key")
        );`
    );
}

export const createMatchesTable = () => {
    return (
        `CREATE TABLE IF NOT EXISTS "matches" (
            "key"	TEXT NOT NULL UNIQUE,
            "result"	TEXT,
            "spiders"	TEXT NOT NULL,
            "isMarked" INTEGER NOT NULL,
            PRIMARY KEY("key")
        );`
    );
}

export const createAlliesTable = () => {
    return (
        `CREATE TABLE IF NOT EXISTS "allies" (
            "key"	TEXT NOT NULL UNIQUE,
            "participants"	TEXT,
            PRIMARY KEY("key")
        );`
    );
}

export const selectAllParticipants = () => {
    return (
        'SELECT * from participants;'
    );
}

export const selectAllFromTable = (table) => {
    return (
        `SELECT * from ${table};`
    );
}

export const insertIntoTable = (table, columns) => {
    let values = columns.map((item) => '?');
    values = values.join();
    return `INSERT INTO ${table} (${columns}) values (${values})`;
}

export const updateTable = (table, columns, where) => {
    columns = columns.map((item) => item +' = ?');
    columns = columns.join(', ');
    return `UPDATE ${table} SET ${columns} WHERE ${where}`;
}

export const deleteFromTable = (table, where) => {
    return `DELETE FROM ${table} where ${where};`
}

export const insertRowsToTable = (table, columns, rows) => {
    const placeholders = [];
    for(let i=0; i<rows; i++) {
        const l = columns.length;
        let s = '(';
        for(let x=0; x<l; x++) {
            s +='?';
            s += x === (l-1) ? ')' : ', '; 
        }
        placeholders.push(s);
    }
    return `INSERT INTO ${table} (${columns}) VALUES ${placeholders};`;
}