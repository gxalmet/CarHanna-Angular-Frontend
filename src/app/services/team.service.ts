import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { Global } from './global';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TeamService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.URLteam;
    }

    createTeam(team: Team): Observable<any>{
        let params = JSON.stringify(team);
        let headers = this.createHeaders();


        return this._http.post(this.url+'/createteam', params, {headers: headers});
    }

    getTeam(team: Team): Observable<any>{
        let params = JSON.stringify(team);
        let headers = this.createHeaders();

        return this._http.get(this.url+'/getteam',  {headers: headers});
    }

    getTeamByUser(): Observable<any>{
        
        let headers = this.createHeaders();

        return this._http.get(this.url+'/getteambyuser',  {headers: headers});
    }

    updateTeam(team: Team): Observable<any>{
        let params = JSON.stringify(team.collegues);
        
        let headers = this.createHeaders();

		return this._http.put(this.url+'/updateteam/'+team._id, params, {headers: headers});
    }
    private createHeaders() {
        let token = localStorage.getItem('access_token');
        return new HttpHeaders({'content-type':'application/json', 
                                'Access-Control-Allow-Origin':'*',
                                'Access-Control-Allow-Methods':'*',
                                'Authorization': 'Bearer ' + token
                                });
        
    }
}
