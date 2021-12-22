import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/Project';
import { ProjectCommandoService } from '../../services/ProjectCommandoService';
import { ProjectService } from '../../services/ProjectService';

@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectCommandoService: ProjectCommandoService) { 
    this.projectCommandoService.projectsSubject.subscribe(p => {
      console.log(p);
      this.projects = p;
    })
  }

  ngOnInit(): void {
  }

}
