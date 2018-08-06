"use strict";
require('dotenv').config();
const Sqlite3 = require("sqlite3");
const DbAdapter = require("./src/DbAdapter");
const App = require("./src/App");

const syncChannels = [
    'cross-chat',
    'xmog-contest',
    'cross-addons-ui',
    'crosschat-moder',
    'cross-key-tactic',
    'cross-leveling-bfa',
];

const dbAdapter = new DbAdapter(new Sqlite3.Database('database.db3'));
const app = new App(syncChannels, dbAdapter);

app.run();