import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Keys } from "../keys/keys";
import { Message } from "../models/Message";
import { WebsocketService } from "./WebsocketService";

const RASPBERRY_URL = "ws://localhost:9001";
//const SERVER_URL = "ws://kataskopos.nl/tv";
const SERVER_URL = "ws://192.168.178.33:45455/tv";

@Injectable()
export class MessageService {
    public raspberryMessages: Subject<Message> = new Subject<Message>();
    public serverMessages: Subject<string> = new Subject<string>();

    constructor(private wsService: WebsocketService) {
        
    }

    sendMessageFromRaspberry() {
        let message = new Message();
        message.message = Keys.recipeList;
        this.raspberryMessages.next(message);
    }

    connectMonitor() {
        this.wsService.connectRaspberry(RASPBERRY_URL).subscribe(
            (response: MessageEvent) => {
                console.log(response.data);
                this.raspberryMessages.next(JSON.parse(response.data));
            }
        );
    }

    connectServer() {
        this.wsService.connectServer(SERVER_URL).subscribe(
            (response: MessageEvent) => {
                this.serverMessages.next(response.data);
            }
        );
    }
}