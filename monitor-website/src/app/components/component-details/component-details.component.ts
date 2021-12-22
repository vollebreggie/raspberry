import { Component, OnInit } from '@angular/core';
import { BaseTask } from '../../models/BaseTask';
import { ComponentService } from '../../services/ComponentService';
import { ProjectService } from '../../services/ProjectService';
import { BaseTaskService } from '../../services/BaseTaskService';
import { PComponent } from '../../models/Component';
import { Project } from '../../models/Project';
import { ProjectCommandoService } from '../../services/ProjectCommandoService';

@Component({
  selector: 'component-details',
  templateUrl: './component-details.component.html',
  styleUrls: ['./component-details.component.scss']
})
export class ComponentDetailsComponent implements OnInit {
  project: Project;
  component: PComponent;
  tasks: BaseTask[] = [];

  title:boolean = false;
  description = false;

  constructor(private projectCommandoService: ProjectCommandoService, private projectService: ProjectService, private componentService: ComponentService, private taskService: BaseTaskService) { 
    
    
    this.projectCommandoService.updatingSubject.subscribe(r => {
      this.title = false;
      this.description = false;

      if(r == "component title") {
        this.title = true;
      } else if(r == "component description") {
        this.description = true;
      } 
    })

    this.projectService.getProjects().subscribe(r => {
      if(r.response.length > 0) {
        this.project = r.response[0];
        this.componentService.GetComponentsByProjectId(r.response[0].id).subscribe(c => {
          if(r.response.length > 0) {
            this.component = c.response[0];
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
