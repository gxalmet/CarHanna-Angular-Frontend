import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { Global } from '../../services/global';

@Component({
  selector: 'app-child-projects',
  templateUrl: './child-projects.component.html',
  styleUrls: ['./child-projects.component.css']
})
export class ChildProjectsComponent implements OnInit {

  @Input() projectParent: Project;

  public message: String;
  public projectsChild: Project[];
  public columns: String[];
  public statusList = Global.status;

  constructor(
    private _projectService: ProjectService,
    private _router: Router
    
  ) { 
    
  }

  

  ngOnInit() {

    this.columns = ["Name","Description","Begin date", "End date", "Status"];

    

    this._projectService.getProjects(this.projectParent).subscribe(
      responseRs=>{
        this.projectsChild = responseRs.projects.slice();
        this.projectsChild.forEach(pro=>{
          pro.check_date.begin_date = new Date(pro.check_date.begin_date);
          pro.check_date.end_date = new Date(pro.check_date.end_date);
          this.statusList.map((stat,i) => {
            if(pro.status == stat.id){
              pro.status = stat.name;
            }
          })
        })
      },
      errorRs=>{
        this.message = errorRs.error.message;
      }
    ); 
  }
  onNavigate(project){
    
    
    
    this._router.navigate( ['editproject' ], {queryParams: { id: project._id }} );
  }

}
