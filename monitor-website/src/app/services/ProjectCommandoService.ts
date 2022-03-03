import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Keys } from "../keys/keys";
import { BaseTask } from "../models/BaseTask";
import { PComponent } from "../models/Component";
import { Message } from "../models/Message";
import { Project } from "../models/Project";
import { BaseTaskService } from "./BaseTaskService";
import { ComponentService } from "./ComponentService";
import { MessageService } from "./MessageService";
import { ProjectService } from "./ProjectService";

@Injectable()
export class ProjectCommandoService {

    message: string = "";

    projectId: number;
    componentId: number;
    taskId: number;

    active: string;
    activeType: string;

    task: BaseTask;
    component: PComponent;
    project: Project;

    public updatingSubject = new Subject<string>();

    public taskSubject = new Subject<BaseTask>();
    public componentSubject = new Subject<PComponent>();
    public projectSubject = new Subject<Project>();
    public projectsSubject = new Subject<Project[]>();
    public componentsSubject = new Subject<PComponent[]>();
    public tasksSubject = new Subject<BaseTask[]>();

    constructor(private taskService: BaseTaskService, private componentService: ComponentService, private projectService: ProjectService, private messageService: MessageService) { }

    processCommando(m: Message) {
        // console.log(m.message);

        if (this.compare(m.message, "stop")) {
            this.activeType = null;
            this.message = "";
        }

        if (this.activeType != null) {
            if (this.compare(m.message, "remove")) {
                this.message = "";
            } else {
                this.message += m.message;
            }

            if (this.compare(m.message, "save")) {
                this.activeType = null;
                this.message = "";

                if (this.active == "project") {
                    this.projectService.updateProject(this.project).subscribe()
                } else if (this.active == "component") {
                    this.componentService.UpdateComponent(this.component).subscribe()
                } else if (this.active == "task") {
                    this.taskService.UpdateTask(this.task).subscribe()
                }
            }

            if (this.active == "project") {
                if (this.activeType == "title") {
                    this.project.title = this.message;
                } else if (this.activeType == "description") {
                    this.project.description = this.message;
                } else if (this.activeType == "points") {

                }

            } else if (this.active == "component") {
                if (this.activeType == "title") {
                    this.project.title = this.message;
                } else if (this.activeType == "description") {
                    this.project.description = this.message;
                } else if (this.activeType == "points") {

                }

            } else if (this.active == "task") {
                if (this.activeType == "title") {
                    this.project.title = this.message;
                } else if (this.activeType == "description") {
                    this.project.description = this.message;
                } else if (this.activeType == "points") {

                }
            }

            this.projectSubject.next(this.project);
        }

        if (this.compare(m.message, "project")) {
            this.active = "project";
            this.componentId = null;
            this.taskId = null;

            this.messageService.raspberryMessages.next(new Message(Keys.openProject, ""));
            this.projectService.getProjects().subscribe(r => {
                this.projectsSubject.next(r.response);
            });

            let name = m.message.replace("project", "");

            this.projectService.getProjectByName(name).subscribe(r => {
                this.projectId = r.response.id;
                this.projectSubject.next(r.response);
                this.project = r.response;
                this.componentService.GetComponentsByProjectId(r.response.id).subscribe(c => {
                    this.componentsSubject.next(c.response);
                })
            });
        }

        if (this.compare(m.message, "component")) {
            this.active = "component";
            this.projectId = this.projectId;
            this.taskId = null;

            this.messageService.raspberryMessages.next(new Message(Keys.openComponent, ""));
            this.componentService.GetComponentsByProjectId(this.projectId).subscribe(r => {
                this.componentsSubject.next(r.response);
            });

            let name = m.message.replace("component", "");
            this.componentService.GetComponentByName(name, this.projectId).subscribe(r => {
                this.componentId = r.response.id;
                this.componentSubject.next(r.response);
                this.component = r.response;
            });
        }

        if (this.compare(m.message, "task")) {
            this.active = "task";

            this.messageService.raspberryMessages.next(new Message(Keys.openTask, ""));
            this.taskService.getTasksByComponentId(this.componentId).subscribe(r => {
                this.tasksSubject.next(r.response);
            });

            let name = m.message.replace("task", "");
            this.taskService.GetTaskByName(name, this.componentId).subscribe(r => {
                this.taskSubject.next(r.response);
                this.taskId = r.response.id;
                this.task = r.response;
            });
        }


        if (this.compare(m.message, "create")) {
            if (this.compare(m.message, "task")) {
                if (this.componentId != null) {
                    this.taskService.CreateTask(this.componentId).subscribe(r => {
                        this.taskSubject.next(r.response);
                        this.taskId = r.response.id;
                    });
                }
            }

            if (this.compare(m.message, "component")) {
                if (this.projectId != null) {
                    this.componentService.CreateComponent(this.projectId).subscribe(r => {
                        this.componentSubject.next(r.response);
                        this.componentId = r.response.id;
                    });
                }
            }

            if (this.compare(m.message, "project")) {
                this.projectService.createProject().subscribe(r => {
                    this.projectSubject.next(r.response);
                    this.projectId = r.response.id;
                });
            }
        }

        if (this.compare(m.message, "title")) {
            this.activeType = "title";
            this.updatingSubject.next(`${this.active} title`);
            console.log("update title");
        }

        if (this.compare(m.message, "description")) {
            this.activeType = "description";
            this.updatingSubject.next(`${this.active} description`);
            console.log("update description");
        }

        if (this.compare(m.message, "points")) {
            this.activeType = "points";
            this.updatingSubject.next(`${this.active} points`);
            console.log("update points");
        }

        if (this.compare(m.message, "delete")) {

        }
    }

    compare(message: string, keyword: string): boolean {
        if (keyword.length < 4 && message == keyword) {
            return true;
        }

        for (let i = 3; i < keyword.length; i++) {
            if (message.includes(keyword.substring(0, i))) {
                return true;
            }
        }

        return false;
    }
}