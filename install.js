let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db3');

db.run("CREATE TABLE admins (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_guild_id TEXT, winner_participant_id INTEGER, datetime INTEGER)");