import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Global } from './global';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './Auth.service';

@Injectable()
export class UserService{
    public url: string;

    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ){
        this.url = Global.URLuser;
    }

    createUser(user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('content-type','application/json');

        return this._http.post(this.url+'/createuser', params, {headers: headers});
    }

    confirmLogin(user: User): Observable<boolean>{
        let params = JSON.stringify(user);

        let headers = new HttpHeaders({ 'content-type':'application/json', 
                                        'Access-Control-Allow-Origin':'*',
                                        'Access-Control-Allow-Methods':'*'
                                        // 'Authorization': 'Bearer ' + token
                                     });

        return this._http.post<{token: string}>(this.url+'/confirmlogin', params, {headers: headers})
        //return this._http.post<{token: string}>(this.url+'/confirmpassword', params)
        .pipe(
            map(result => { 
                
                
                this._authService.setLocalStorage(result);
                //localStorage.setItem('access_token', result.token);
                return true;
            })
          );
    }

    logout() {
        this._authService.logout();
        //localStorage.removeItem('access_token');
      }

    getUser(id): Observable<any>{
        //var token = localStorage.getItem('access_token');
        let headers = new HttpHeaders({ 'content-type':'application/json', 
                                        'Access-Control-Allow-Origin':'*',
                                        'Access-Control-Allow-Methods':'*'
                                        // 'Authorization': 'Bearer ' + token
                                     });

		return this._http.get(this.url+'/getuserbyid'+id, {headers: headers});
    }
    getUserByToken(): Observable<any>{
        //var token = localStorage.getItem('access_token');
        let headers = new HttpHeaders({ 'content-type':'application/json', 
                                        'Access-Control-Allow-Origin':'*',
                                        'Access-Control-Allow-Methods':'*'
                                        //'Authorization': 'Bearer ' + token
                                     });
        
		return this._http.get(this.url+'/getuserbytoken', {headers: headers});
    }

    public get loggedIn(): boolean {
        return this._authService.loggedIn();
        //return (localStorage.getItem('access_token') !== null);
      }

    // public getAccess(){
 
    //     let params = new HttpParams();
 
    //     params = params.set('client_id', '76');
    //     params = params.set('client_secret', 'fKYSZcJu0a13xQ8pB4ycRpbiwcEGXz5Tp3n6rHc5');
    //     params = params.set('grant_type', 'password');
    //     params = params.set('email', 'n.ethalaavinash94@gmail.com');
    //     params = params.set('password', '111111');
    //     params = params.set('scope', '*');
 
    //     return this._http.post(`${this.url}/oauth/token/`,params);
 
    // }
}