import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { FormControl, Validators  } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ UserService]
})
export class RegisterComponent implements OnInit {
  public title: String;
  public user: User;
  public message: String;
  public formControl: FormControl;

  constructor(
    private _userService: UserService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    var formControl = new FormControl('',[
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);

    this.title = 'Sign Up';

    this.user = new User( ' ', {firstname: '', lastname:''}, '', '' );
  }
  onSubmit( userForm ) {
   
    this._userService.createUser(this.user).subscribe(
      response =>{
        this.message = response.message;
        this._router.navigate( ['login' ] );
      },
      error=> {
        
      }
    );
  }

}
