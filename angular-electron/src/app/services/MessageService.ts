import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Message } from "../models/Message";
import { WebsocketService } from "./WebsocketService";

const CHAT_URL = "ws://localhost:8765";

@Injectable()
export class MessageService {
    public messages: Subject<String>;

    constructor(wsService: WebsocketService) {
        this.messages = <Subject<String>>wsService.connect(CHAT_URL).pipe(map(
            (response: MessageEvent): String => {
                //let data = JSON.parse(response.data);
                console.log(response.data);

                return "asdf";
            }
        ));
    }
}