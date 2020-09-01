import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.URLproject;
    }

    createProject(project: Project): Observable<any>{
        let params = JSON.stringify(project);
        
        let headers = this.createHeaders();

        return this._http.post(this.url+'/createproject', params, {headers: headers});
    }

    getProjects(projectParent: Project): Observable<any>{
        let paramsParent = JSON.stringify(projectParent);
        
        let headers = this.createHeaders();
        let params = new HttpParams().set('projectParent', paramsParent);
        
        return this._http.get(this.url+'/getprojects', {headers: headers, params: params});
    }
    getProjectsTree(projectParent: Project): Observable<any>{
        let paramsParent = JSON.stringify(projectParent);
        
        let headers = this.createHeaders();
        let params = new HttpParams().set('projectParent', paramsParent);
        
        return this._http.get(this.url+'/getprojectstree', {headers: headers, params: params});
    }
    getProject(id): Observable<any>{
        
        let headers = this.createHeaders();

		return this._http.get(this.url+'/getproject/'+id, {headers: headers});
    }

    updateProject(Project): Observable<any>{
        let params = JSON.stringify(Project);
        
        let headers = this.createHeaders();

		return this._http.put(this.url+'/updateproject/'+Project._id, params, {headers: headers});
    }
    deleteProject(ProjectID): Observable<any>{
        // let params = JSON.stringify(Project);
        
        let headers = this.createHeaders();

		return this._http.delete(this.url+'/deleteproject/'+ProjectID, {headers: headers});
    }
    private createHeaders() {
        //let token = localStorage.getItem('access_token');
        return new HttpHeaders({'content-type':'application/json', 
                                'Access-Control-Allow-Origin':'*',
                                'Access-Control-Allow-Methods':'*'
                                //'Authorization': 'Bearer ' + token
                                });
        
    }
}