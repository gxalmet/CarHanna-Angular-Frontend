import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';

import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css'],
  providers: [ TeamService ]
})
export class MyTeamComponent implements OnInit {
  public title: string;
  public message: string;
  public team: Team;
  public editField: string;
  public columns: String[];
  //public collegue: Team;

  constructor(

    private _teamService: TeamService,
  	private _router: Router,
    private _route: ActivatedRoute
    ) {

   }

  ngOnInit() {

    this.columns = ["E-mail","First Name","Lastname", "User", "Remove"];

    this._teamService.getTeamByUser().subscribe(
      result=>{
        this.team = result.team[0];

    },
      err=>{
        
        this.message = err.error.message;
        var item =  { _id: '', email: ' ' ,  person: { firstname : ' ', lastname :' '} , user_id_col: ' ' };
        this.team = new Team( ' ', ' ', [ item ] );
        this._teamService.createTeam(this.team).subscribe(
          resTeam=>{
            
            this.team = resTeam.teamcreated[0];
            
          },
          errTeam=>{
            this.message = errTeam.error.message;
          }
        );
      }
    );
    
  }
  onCancel():void{
    this._router.navigate(['projects']);
  }
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;

    if(property=='person.firstname'){
      this.team.collegues[id].person.firstname = editField;
      
    }
    if(property=='person.lastname'){
      let col = this.team.collegues[id];
      col.person.lastname = editField.toString();
    }
    if(property!='person.firstname' && property!='person.lastname'){
      this.team.collegues[id][property] = editField;
    }
    
    
  }

  remove(id: any) {
    //this.collegue.collegues.push(this.team.collegues[id]);
    this.team.collegues.splice(id, 1);
    this.save(this.team);
  }

  add() {
    //if (this.collegue.collegues.length > 0) {
      //const col = {email: '@', person: {firstname: ' ', lastname :' '};
      //this.team.collegues[0] = {email: '@', person: {firstname: ' ', lastname :' '}, user_id: ''};
      
      //this.team.collegues[0] = new Array{email: '@', person: {firstname: ' ', lastname :' '}, user_id: ''};
      var item =  { '_id':'', 'email': ' ' ,  'person': { 'firstname' : ' ', 'lastname' :' '} , 'user_id_col': ' ' };
      this.team.collegues.push(item);
      
    //}
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  save(team:Team){
    
    this._teamService.updateTeam(this.team).subscribe(
      teamSave=>{
        this.team = teamSave.teamsaved;
        
      },
      errorSave=>{
        this.message = errorSave.error.message;
      }
    )
  }
  addCollegue(){
    this._router.navigate(['collegue']);
  }
}
