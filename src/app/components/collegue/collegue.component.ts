import { Component, OnInit } from '@angular/core';
import { Team } from '../../models/team';
import { TeamService } from '../../services/team.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { exitCodeFromResult } from '@angular/compiler-cli';

@Component({
  selector: 'app-collegue',
  templateUrl: './collegue.component.html',
  styleUrls: ['./collegue.component.scss'],
  providers: [ TeamService ]
})

export class CollegueComponent implements OnInit {

  public title: string;
  public message: string;
  public team: Team;
  public item = { '_id':'', 'email': ' ' ,  'person': { 'firstname' : ' ', 'lastname' :' '} , 'user_id_col': ' ' };

  constructor(
     private _teamService: TeamService,
  	private _router: Router,
  	private _route: ActivatedRoute
  ) { }

  ngOnInit() {

    this._teamService.getTeamByUser().subscribe(
      result=>{
        this.team = result.team[0];
    },
      err=>{
        this.message = err.error.message;
      }
    );
    
  }
  onSave(){
    var ok = true;
    this.team.collegues.map(col=>{

      if(col.email.localeCompare(this.item.email) == 0 && ok == true){
        this.message = 'Collegue alredy in your team.';
        ok = false;
      }
    });
    
    if(ok == true){
      this.team.collegues.push(this.item);
      this._teamService.updateTeam(this.team).subscribe(
        teamSave=>{
          this.team = teamSave.teamsaved;
          this._router.navigate(['myteam']);
        },
        errorSave=>{
          this.message = errorSave.error.message;
        }
      )
    }

  }
  checkUser(){

  }
}
