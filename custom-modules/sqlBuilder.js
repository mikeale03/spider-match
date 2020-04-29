export const createParticipantsTable = () => {
    return (
        `CREATE TABLE IF NOT EXISTS participants (
            key	TEXT PRIMARY KEY NOT NULL UNIQUE,
            name TEXT,
            score INTEGER,
            image TEXT,
            alliesKey TEXT
        );`
    );
}

export const createMatchesTable = () => {
    return (
        `CREATE TABLE matches (
            key	TEXT PRIMARY KEY NOT NULL UNIQUE,
            result	TEXT,
            spider1	TEXT NOT NULL UNIQUE,
            spider2	TEXT NOT NULL UNIQUE
        );`
    );
}

export const createSpidersTable = () => {
    return (
        `CREATE TABLE spiders (
            key	TEXT PRIMARY KEY NOT NULL UNIQUE,
            image TEXT,
            weight NUMERIC,
            parentKey TEXT NOT NULL,
            otherDetails TEXT,
            isJoker	INTEGER
        );`
    );
}