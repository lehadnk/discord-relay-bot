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
  await db.createTable('bans', {
    id: { type: 'int', primaryKey: true, autoIncrement: true},
    banned_discord_user_id: 'string',
    issuer_discord_user_id: 'string',
    issuer_discord_user_name: 'string',
    given_at: 'int',
    comment: 'string',
  });
};

exports.down = async function(db) {
  return await db.dropTable('bans');
};

exports._meta = {
  "version": 1
};
