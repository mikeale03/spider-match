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
            PRIMARY KEY("key")
        );`
    );
}

export const createSpidersTable = () => {
    return (
        `CREATE TABLE IF NOT EXISTS spiders (
            spiderKey TEXT PRIMARY KEY NOT NULL UNIQUE,
            weight NUMERIC NOT NULL,
            otherDetails TEXT,
            spiderImage TEXT,
            isJoker	INTEGER,
            parentKey TEXT NOT NULL,
            FOREIGN KEY("parentKey") REFERENCES "participants"("key") ON DELETE CASCADE
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
    )
}

export const insertIntoTable = (table, columns) => {
    let values = columns.map((item) => '?');
    values = values.join();
    return `INSERT INTO ${table} (${columns}) values (${values})`;
}

// console.log(insertIntoTable(
//     'participants', ['name', 'score', 'image']
// ))