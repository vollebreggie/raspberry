import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/ProjectService';
import { ComponentService } from '../../services/ComponentService';
import { PComponent } from '../../models/Component';

@Component({
  selector: 'component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.scss']
})
export class ComponentListComponent implements OnInit {

  components: PComponent[] = [];

  constructor(private projectService: ProjectService, private componentService: ComponentService) {
    this.projectService.getProjects().subscribe(r => {
      if (r.response.length > 0) {
        this.componentService.GetComponentsByProjectId(r.response[0].id).subscribe(c => {
          this.components = c.response;
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
