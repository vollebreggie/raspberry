import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Message } from "../models/Message";
import { WebsocketService } from "./WebsocketService";

const RASPBERRY_URL = "ws://localhost:8765";
const SERVER_URL = "ws://localhost:8765";

@Injectable()
export class MessageService {
    public raspberryMessages: Subject<Message> = new Subject<Message>();
    public serverMessages: Subject<Message> = new Subject<Message>();

    constructor(private wsService: WebsocketService) {
        
    }

    connectMonitor() {
        this.wsService.connect(RASPBERRY_URL).subscribe(
            (response: MessageEvent) => {
                this.raspberryMessages.next(JSON.parse(response.data));
            }
        );
    }

    connectServer() {
        this.wsService.connect(SERVER_URL).subscribe(
            (response: MessageEvent) => {
                this.serverMessages.next(JSON.parse(response.data));
            }
        );
    }
}