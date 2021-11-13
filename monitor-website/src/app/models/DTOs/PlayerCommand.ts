import { PlayerCommandoType } from "../enums/PlayerCommandoType";

export class PlayerCommand {
    type: PlayerCommandoType;
    playListId: number;

    constructor(init?:Partial<PlayerCommand>) {
        Object.assign(this, init);
    }
}