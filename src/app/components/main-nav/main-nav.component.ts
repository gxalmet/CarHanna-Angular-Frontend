import { Component, OnInit } from '@angular/core';
import { User} from '../../models/user';
import { UserService} from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService} from '../../services/Auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  providers: [ UserService ]
})

export class MainNavComponent implements OnInit {

  private user: User;
  public firstname: string;
  public lastname: string;
  public userValid: boolean;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _authService: AuthService,
  ) { 
    this.userValid = false;
  }
  
  ngOnInit(): void {

    if(this._authService.loggedIn()){
      this._userService.getUserByToken().subscribe(
        response =>{
          
          this.user = response.user;
          this.firstname = response.user.person.firstname;
          this.lastname = response.user.person.lastname;
          this.userValid = true;

         // this._router.navigate( ['projects' ] );
        },
        error=> {
          this.userValid = false;

          if(this._router.url== '/calendar' 
          || this._router.url== '/projects'
          || this._router.url== '/editproject' 
          || this._router.url== '/createproject'
          || this._router.url== '/myteam' ){
            this._router.navigate( ['login' ] );
          }
        }
      )
    }else{
      if(this._router.url== '/home' 
      || this._router.url== '/' 
      || this._router.url== '/login' 
      || this._router.url== '/register' ){

      }else{
        this._router.navigate( ['login' ] );
      }
      
    }
  }
  logout():void{
    
    localStorage.clear();
    this.userValid = false;
    this._router.navigate( ['home' ] );
  }
}
