import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user:any) {
    if(user.name == '' || user.username == '' || user.email == '' || user.password == '') {
      return false;
    }
    return true;
  }

  validateEmail(email:string){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
}
