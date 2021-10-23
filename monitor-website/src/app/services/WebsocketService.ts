import { Injectable } from "@angular/core";
import { Observable, Observer, Subject } from "rxjs";
import * as Rx from "rxjs/Rx";
import { WebSocketMessage } from "../models/WebSocketMessage";

@Injectable()
export class WebsocketService {
  constructor() { }

  private subjectServer: Subject<MessageEvent>;
  private subjectRaspberry: Subject<MessageEvent>;

  public connectRaspberry(url): Subject<MessageEvent> {
    if (!this.subjectRaspberry) {
      this.subjectRaspberry = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subjectRaspberry;
  }

  public connectServer(url): Subject<MessageEvent> {
    if (!this.subjectServer) {
      this.subjectServer = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subjectServer;
  }

  private create(url): Subject<MessageEvent> {
    let ws = new WebSocket(url);
    
    ws.onopen = () => ws.send(this.createConnectionOpenendMessage());
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        } else {
          console.log("something");
        }
      }
    };
    return Subject.create(observer, observable);
  }

  createConnectionOpenendMessage(): string {
    let message = new WebSocketMessage();
    message.Device = 5;
    message.UserId = "'693b2e8c-4a2b-44ca-956a-c9a1cc6f8de6'";
    message.Message = "'connection opened'";
    let jsonMessage = JSON.stringify(message);
    console.log(jsonMessage);
    return jsonMessage;
  }

}