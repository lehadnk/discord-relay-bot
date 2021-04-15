import {AbstractDAO} from 'nergal';
import {IDbAdapter} from 'nergal';
import Ban from "../Models/Ban";

export default class BansDAO extends AbstractDAO<Ban> {
    fields: string[] = ['id', 'banned_discord_user_id', 'issuer_discord_user_id', 'issuer_discord_user_name', 'given_at', 'comment'];
    table: string = 'bans';

    public constructor(db: IDbAdapter) {
        super(db, () => new Ban());
    }

    async delete(discord_user_id: string) {
        await this.db.run("DELETE FROM bans WHERE banned_discord_user_id = ?1", {
            1: discord_user_id
        });
    }
}