export const createParticipantsTable = () => {
    return (
        `CREATE TABLE IF NOT EXISTS "participants" (
            "key"	TEXT NOT NULL UNIQUE,
            "name"	TEXT,
            "image"	TEXT,
            "score"	NUMERIC,
            "alliesKey"	TEXT,
            "spiders"	TEXT NOT NULL,
            PRIMARY KEY("key"),
            FOREIGN KEY("alliesKey") REFERENCES "allies"("key") ON DELETE SET NULL
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
            "participant1"	TEXT NOT NULL,
            "participant2"	TEXT NOT NULL,
            "score"	INTEGER,
            PRIMARY KEY("key")
        );`
    );
}

export const createAlliesTable = () => {
    return (
        `CREATE TABLE IF NOT EXISTS "allies" (
            "key"	TEXT NOT NULL UNIQUE,
            "groupName" TEXT,
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

export const insertRowsIntoTable = (table, columns, rows) => {
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

export const revertParticipantsDrawScore = () => {
    return `UPDATE participants SET score = score - 
    (SELECT sum(score) from matches m WHERE m.isMarked = 1 AND result = 'Draw' AND 
    (m.participant1 = participants.key OR m.participant2 = participants.key)) WHERE EXISTS 
    (SELECT * from matches m WHERE m.isMarked = 1 AND result = 'Draw' AND 
    (m.participant1 = participants.key OR m.participant2 = participants.key));`
}

export const revertParticipantsWinScore = () => {
    return `UPDATE participants SET score = score - 
    (SELECT sum(score) from matches m WHERE m.isMarked = 1 AND result = participants.key) WHERE EXISTS 
    (SELECT * from matches m WHERE m.isMarked = 1 AND result = participants.key);`
}