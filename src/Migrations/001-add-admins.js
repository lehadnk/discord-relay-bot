let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('../../database.db3');

db.run("INSERT INTO admins(discord_user_id, comment) VALUES ('207169330549358592', 'Энмеркар'), ('213344018556256258', 'Райнон'), ('209029118141005824', 'Кухня'), ('208562798064566285', 'Наркиса'), ('208562798064566285', 'Сарати'), ('213326376466382849', 'Стори')");