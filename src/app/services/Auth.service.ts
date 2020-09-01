import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  
) { 
  console.log('Constructor');
}

setLocalStorage(responseObj){
  localStorage.setItem('access_token', responseObj.token);
}
logout() {
  localStorage.removeItem('access_token');
}
loggedIn(){
  return (localStorage.getItem('access_token') !== null);
}  
}
