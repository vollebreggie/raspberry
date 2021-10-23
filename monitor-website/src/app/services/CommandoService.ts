import { Injectable } from "@angular/core";
import { MessageService } from "./MessageService";

@Injectable()
export class CommandoService {

    constructor(private messageService: MessageService) {}
}