import { Component, OnInit } from '@angular/core';

//import { User } from '../../models/user';
import { Project } from '../../models/project';

//import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl, Validators  } from '@angular/forms';
import * as moment from 'moment/moment';


@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css'],
  providers: [  ProjectService]
})

export class CreateProjectComponent implements OnInit {
  public title: String;
  //public user: User;
  public project: Project;
  public message: String;
  public firstname: String;
  public lastname: String;
  public parentId: string;
  
  

  constructor(
    private _projectService: ProjectService,
    //private _userService: UserService,
  	private _router: Router,
  	private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(
      param=>{
        this.parentId = param.id;

        var now = new Date();
        this.project = new Project(  
        '', 
        this.parentId, 
        '', 
        '', 
        '', 
        0,
        { 'begin_date': new Date(),
          'end_date': new Date() }, 
        'Open', 
        [{ 'team_user_id': ''}] );
      }
    );

    this.title = "Create project...";
    
    


  
}

  onSave(projectForm): void{
    
    
    if(this.project._id){
      this._projectService.updateProject(this.project).subscribe(
         responseU=> {
          this.message = responseU.message;
          
          this.project = responseU.project;

          this.project.check_date.begin_date = responseU.project.check_date.begin_date.slice(0,10);
          this.project.check_date.end_date = responseU.project.check_date.end_date.slice(0,10);

         },
         errorU=>{
          this.message = errorU.error.message;
         }
      );
    }
    else{
      
      this._projectService.createProject(this.project).subscribe(
        responseC =>{

          this.message = responseC.message;
          
          this.project = responseC.project;
  

          this.project.check_date.begin_date = responseC.project.check_date.begin_date.slice(0,10);
          this.project.check_date.end_date = responseC.project.check_date.end_date.slice(0,10);

          this._router.navigate( ['projects' ] );
        },
        errorC=> {
          this.message = errorC.error.message;
        }
      );
    }
    
  }
onCancel():void{
  this._router.navigate(['projects']);
}
}
