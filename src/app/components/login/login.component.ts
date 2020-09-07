import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ UserService]
})
export class LoginComponent implements OnInit {
  public title: String;
  public user: User;
  public message: String;

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) { }


  ngOnInit(): void {
    this.title = 'Login';
    this.user = new User( ' ', {firstname: ' ', lastname:' '}, ' ', '' );

  }
  onLogin( userForm ) {
    this.message = 'Log in process...';
    this._userService.confirmLogin(this.user)
    .pipe(first())
    .subscribe(
      response =>{
        //response.user
        
        //var userid = response.user[0]._id;
        
        
        this._router.navigate( ['projects' ] );
        
      },
      error=> {
        
        this.message = error.error.message;
      }
    );
  }

}
