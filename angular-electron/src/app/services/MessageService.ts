import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Message } from "../models/Message";
import { WebsocketService } from "./WebsocketService";

const CHAT_URL = "ws://localhost:8765";

@Injectable()
export class MessageService {
    public messages: Subject<Message>;

    constructor(wsService: WebsocketService) {
        this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(map(
            (response: MessageEvent): Message => {
                return JSON.parse(response.data);
            }
        ));
    }
}