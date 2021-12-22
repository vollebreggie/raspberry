import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ComponentService } from '../../services/ComponentService';
import { ProjectService } from '../../services/ProjectService';
import { PComponent } from '../../models/Component';
import { ProjectCommandoService } from '../../services/ProjectCommandoService';

@Component({
  selector: 'project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: Project;
  components: PComponent[];

  title: boolean = false;
  description: boolean = false;
  points: boolean = false;

  constructor(private projectCommandoService: ProjectCommandoService, private projectService: ProjectService) {

    this.projectCommandoService.updatingSubject.subscribe(r => {
      this.title = false;
      this.description = false;

      if(r == "project title") {
        this.title = true;
      } else if(r == "project description") {
        this.description = true;
      } 
    })

    this.projectCommandoService.projectSubject.subscribe(p => {
      this.project = p;
    });

    this.projectCommandoService.componentsSubject.subscribe(c => {
      this.components = c;
    });
  }

  ngOnInit(): void {
  }

}
