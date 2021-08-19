import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Message } from "../models/Message";
import { WebsocketService } from "./WebsocketService";

const RASPBERRY_URL = "ws://localhost:8765";
const SERVER_URL = "ws://localhost:8765";

@Injectable()
export class MessageService {
    public raspberryMessages: Subject<Message>;
    public serverMessages: Subject<Message>;

    constructor(private wsService: WebsocketService) {
        
    }

    connectMonitor() {
        this.raspberryMessages = <Subject<Message>>this.wsService.connect(RASPBERRY_URL).pipe(map(
            (response: MessageEvent): Message => {
                return JSON.parse(response.data);
            }
        ));
    }

    connectServer() {
        this.serverMessages = <Subject<Message>>this.wsService.connect(SERVER_URL).pipe(map(
            (response: MessageEvent): Message => {
                return JSON.parse(response.data);
            }
        ));
    }
}