import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../../services/ComponentService';
import { ProjectService } from '../../services/ProjectService';
import { BaseTaskService } from '../../services/BaseTaskService';
import { BaseTask } from '../../models/BaseTask';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: BaseTask[] = [];

  constructor(private projectService: ProjectService, private componentService: ComponentService, private taskService: BaseTaskService) { 
    this.projectService.getProjects().subscribe(r => {
      if(r.response.length > 0) {
        this.componentService.GetComponentsByProjectId(r.response[0].id).subscribe(c => {
          if(r.response.length > 0) {
            this.taskService.getTasksByComponentId(c.response[0].id).subscribe(t => {
              this.tasks = t.response;
            });
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
