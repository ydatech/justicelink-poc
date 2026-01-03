const db =  require('better-sqlite3')('screenings.db');

// create table screening if not exists

db.prepare(`
    CREATE TABLE IF NOT EXISTS screenings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        householdSize INTEGER,
        income REAL,
        limitValue REAL,
        result TEXT,
        timestamp TEXT
    )
    `).run();


module.exports = {
    // method for insert new screening record
    insert(record){

        const statement = db.prepare(`
            INSERT INTO screenings (name, householdSize, income, limitValue, result, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
            `);
        statement.run(
            record.name,
            record.householdSize,
            record.income,
            record.limit,
            record.result,
            record.timestamp
        );
    },

    getAll(){
        return db.prepare("SELECT * FROM screenings ORDER BY id DESC").all();
    }
}
