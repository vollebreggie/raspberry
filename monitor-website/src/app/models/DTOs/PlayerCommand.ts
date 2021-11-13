export class PlayerCommand {
    type: string;
    playListId: number;

    constructor(init?:Partial<PlayerCommand>) {
        Object.assign(this, init);
    }
}