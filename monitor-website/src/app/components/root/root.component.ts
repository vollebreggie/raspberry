import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { cardAnimation } from '../../animations/card-animation';
import { Keys } from '../../keys/keys';
import { Message } from '../../models/Message';
import { MessageService } from '../../services/MessageService';
import { MusicPlayerService } from '../../services/MusicPlayerService';
import { ProjectCommandoService } from '../../services/ProjectCommandoService';
import { ScheduleService } from '../../services/ScheduleService';
import { SpeachLogService } from '../../services/SpeachLogService';
import { WeekService } from '../../services/WeekService';

@Component({
  selector: 'root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class RootComponent implements OnInit, AfterContentInit {
  consoleAnimate: string = "open";
  notificationAnimate: string = "open";
  recipeDetailsAnimate: string = "close";
  scheduleAnimate: string = "open";
  recipeListAnimate: string = "close";
  shoppingListAnimate: string = "close";
  musicAnimate: string = "open";

  projectListAnimate: string = "close";
  projectDetailAnimate: string = "close";
  componentListAnimate: string = "close";
  componentDetailAnimate: string = "close";
  taskListAnimate: string = "close";
  taskDetailAnimate: string = "close";


  constructor(private speachLogService: SpeachLogService, private weekService: WeekService, private messageService: MessageService, private musicPlayerService: MusicPlayerService, private projectCommandoService: ProjectCommandoService) {
    this.messageService.connectMonitor();
    this.messageService.connectServer();

    

    this.messageService.raspberryMessages.subscribe(r => {
      //console.log(r);

      if (r.message == Keys.consoleOpen) {
        this.consoleAnimate = "open";
      } else if (r.message == Keys.consoleClose) {
        this.consoleAnimate = "close";
      }

      if (r.message == Keys.notificationOpen) {
        this.notificationAnimate = "open";
      } else if (r.message == Keys.notificationClose) {
        this.notificationAnimate = "close";
      }

      if (r.message == Keys.recipeDetailsOpen) {
        this.recipeDetailsAnimate = "open";
      } else if (r.message == Keys.recipeDetailsClose) {
        this.recipeDetailsAnimate = "close";
      }

      if (r.message == Keys.scheduleOpen) {
        this.scheduleAnimate = "open";
      } else if (r.message == Keys.scheduleClose) {
        this.scheduleAnimate = "close";
      }

      if (r.message == Keys.recipeList) {
        this.consoleAnimate = "close";
        this.scheduleAnimate = "close";
        this.recipeDetailsAnimate = "close";
        this.recipeListAnimate = "open";
        this.shoppingListAnimate = "open";
      }

      if (r.message == Keys.openProject) {
        console.log("opened project");
        this.closeEverything();
        this.projectListAnimate = "open";
        this.projectDetailAnimate = "open";
      }

      if (r.message == Keys.openComponent) {
        console.log("opened component");
        this.closeEverything();
        this.componentListAnimate = "open";
        this.componentDetailAnimate = "open";
      }

      if (r.message == Keys.openTask) {
        console.log("opened task");
        this.closeEverything();
        this.taskDetailAnimate = "open";
        this.taskListAnimate = "open";
      }

      if (r.message == Keys.musicOpen) {
        this.musicAnimate = "open";
      } else if (r.message == Keys.musicClose) {
        this.musicAnimate = "close";
      }

      if (this.compare(r.message, "music")) {
        this.musicAnimate = "open";
        this.musicPlayerService.sendCommando(r.message, r.args);
      }

      if (this.compare(r.message, "play")) {
        this.musicPlayerService.sendCommando(Keys.musicPlay, r.args);
      }

      if (this.compare(r.message, "next")) {
        this.musicPlayerService.sendCommando(Keys.musicNext, r.args);
      }

      if (this.compare(r.message, "previous")) {
        this.musicPlayerService.sendCommando(Keys.musicPrevious, r.args);
      }

      if (this.compare(r.message, "pause") || this.compare(r.message, "stop")) {
        this.musicPlayerService.sendCommando(Keys.musicPause, r.args);
      }

      if (this.compare(r.message, "playlist") || this.compare(r.message, "list")) {
        this.musicPlayerService.sendCommando(Keys.musicPlay, r.message.replace("playlist", "").replace("list", ""));
      }

      if (this.compare(r.message, "monday")) {
        this.weekService.weekSubject.next(1);
      }

      if (this.compare(r.message, "tuesday")) {
        this.weekService.weekSubject.next(2);
      }

      if (this.compare(r.message, "wednesday")) {
        this.weekService.weekSubject.next(3);
      }

      if (this.compare(r.message, "thursday")) {
        this.weekService.weekSubject.next(4);
      }

      if (this.compare(r.message, "friday")) {
        this.weekService.weekSubject.next(5);
      }

      if (this.compare(r.message, "saturday")) {
        this.weekService.weekSubject.next(6);
      }

      if (this.compare(r.message, "sunday")) {
        this.weekService.weekSubject.next(0);
      }

      this.projectCommandoService.processCommando(r);
    });

    this.messageService.serverMessages.subscribe(r => {
      console.log(r);
    });
  }

  compare(message: string, keyword: string): boolean {
    
    if(keyword.length < 4 && message == keyword) {
      return true;
    }

    for (let i = 4; i < keyword.length; i++) {
      if(message.includes(keyword.substring(0, i))) {  
        return true;
      }
    }

    return false;
  }

  closeEverything() {
    this.notificationAnimate = "close";
    this.musicAnimate = "close";
    this.consoleAnimate = "close";
    this.scheduleAnimate = "close";
    this.recipeDetailsAnimate = "close";
    this.recipeListAnimate = "close";
    this.projectListAnimate = "close";
    this.projectDetailAnimate = "close";
    this.componentListAnimate = "close";
    this.componentDetailAnimate = "close";
    this.taskDetailAnimate = "close";
    this.taskListAnimate = "close";
  }

  testKeyWord(): void {
    this.speachLogService.getSpeachLog().subscribe(r => {
      let correct = 0;
      let incorrect = 0;
      r.response.forEach(m => {
        //create, task, component, title
        if (this.compare(m.message, "project")) {
          if (m.keyword == "project") {
            correct++;
          } else {
            console.log("message: " + m.message + ", keyword: " + "project");
            incorrect++;
          }
        }
      });

      console.log("Correct: " + correct + ", Incorrect: " + incorrect);
    });
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    //this.messageService.sendMessageFromRaspberry();
  }
}
