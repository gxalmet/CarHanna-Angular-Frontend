import { Component, OnInit, OnDestroy } from '@angular/core';

import { User } from '../../models/user';
import { Project } from '../../models/project';
import { Team } from '../../models/team';

import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { TeamService } from '../../services/team.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
// import { FormControl, Validators  } from '@angular/forms';
// import * as moment from 'moment/moment';
// import { Subscription } from 'rxjs';

export interface TeamListDropbox {
  id: string;
  name: string;
}


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
  providers: [ UserService, ProjectService, TeamService ]
})
export class EditProjectComponent implements OnInit
// , OnDestroy 
{

  public title: String;
  public user: User;
  public project: Project;
  public projectsChild: Project[];
  public message: String;
  
  public columns: String[];
  public team: Team;
  
  public teamList: TeamListDropbox[] = [];
  public teamSelected = [];
  public deleteButtonDisabled = false;
  //public paramsSub: Subscription;
  

  constructor(
    private _projectService: ProjectService,
    private _teamService: TeamService,
  	private _router: Router,
  	private _route: ActivatedRoute
  ) { 
    console.log('constructor');
  }

  ngOnInit(): void {

    this._router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };

    this.columns = ["Name","Description","Begin date", "End date", "Status"];
    

    console.log(this._route.snapshot.queryParams);
    var id = this._route.snapshot.queryParamMap.get('id');
    this._route.snapshot.queryParams = {};

    // this._route.params.subscribe(
    //   params=>{
        
        //this._projectService.getProject(params.id).subscribe(
        this._projectService.getProject(id).subscribe(
          responseR =>{
  
            this.message = responseR.message;
            this.project = responseR.project;
    
            this.project.check_date.begin_date = responseR.project.check_date.begin_date.slice(0,10);
            this.project.check_date.end_date = responseR.project.check_date.end_date.slice(0,10);
            this.title = "Edit project: " + this.project.name;

            this._teamService.getTeamByUser().subscribe(
              teamRead=>{
                
                this.team = teamRead.team[0];
                var i = 1;   
                this.team.collegues.forEach(col=>{
                  this.teamList.push( {'id': col._id.toString(), 'name': col.email.toString() + " " + col.person.firstname + " " + col.person.lastname} );
                  
                  i++;
                });

                if(this.project.team.length>0){
                  this.project.team.forEach(selteam=>{
                    this.teamSelected.push(selteam.team_user_id);
                  });
                }else{
                  this.teamSelected = [this.teamList[0].id];
                }

              },
              teamError=>{
                this.message = teamError.error.message;
              }
            );
            this._projectService.getProjects(this.project).subscribe(
              responseRs=>{

                this.projectsChild = responseRs.projects.slice();

                if(this.projectsChild.length==0){
                  this.deleteButtonDisabled = false;
                }else{
                  this.deleteButtonDisabled = true;
                }


                
                
              },
              errorRs=>{
                this.message = errorRs.error.message;
              }
            );
           
          },
          errorC=> {
            this.message = errorC.error.message;
          }
        );
    //   }
    // );

  }
//   public ngOnDestroy(): void {
//     // Prevent memory leaks
//     console.log('ngOnDestroy');
//     this.paramsSub.unsubscribe();
// }

  onSave(projectForm): void{

    this.teamSelected.forEach((sel,i)=>{
      if(i==0){
        this.project.team = [{team_user_id: sel}];
      }else{
        this.project.team.push({team_user_id: sel});
      }
    });

    this._projectService.updateProject(this.project).subscribe(
        responseU=> {
        this.message = responseU.message;
        
        this.project = responseU.project;

        this.project.check_date.begin_date = responseU.project.check_date.begin_date.slice(0,10);
        this.project.check_date.end_date = responseU.project.check_date.end_date.slice(0,10);
        this._router.navigate(['projects']);

        },
        errorU=>{
        this.message = errorU.error.message;
        }
    );
    
  }
  getSelectedValue(){
    
  }
  onCancel():void{
    this._router.navigate(['projects']);
  }
  onDelete(ProjectForm):void{
    
    this._projectService.deleteProject(this.project._id).subscribe(
      responseD =>{
  
       this._router.navigate( ['projects' ] );
      },
      errorD=> {
        this.message = errorD.error.message;
      }
    );
  
  }
  onNavigate(project){
    //this._router.navigate( ['editproject/' + project._id ] );
    console.log(this._router);
    
    this._router.navigate( ['editproject' ], {queryParams: { id: project._id }} );
  }
  onCreateChildProject(project){
    this._router.navigate( ['createproject/' + project._id] );
  }

}
