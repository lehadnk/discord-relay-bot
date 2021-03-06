'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function(db) {
  await db.createTable('channels', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    discord_guild_id: 'string',
    discord_channel_id: 'string',
    topic: 'string',
  });
};

exports.down = async function(db) {
  return await db.dropTable('channels');
};

exports._meta = {
  "version": 1
};
