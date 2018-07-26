let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('database.db3');

db.run("CREATE TABLE admins (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_user_id TEXT, comment TEXT)");
db.run("CREATE TABLE bans (id INTEGER PRIMARY KEY AUTOINCREMENT, discord_user_id TEXT, reason TEXT, issuer_discord_user_id TEXT, issuer_discord_user_name TEXT, issued_at TEXT)");