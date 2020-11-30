import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from '../models/Login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  {


  constructor(private http_service:HttpClient)
  {

  }
  verifyUser(user_credentials:Login):Observable<HttpResponse<Login>>
  {
      return this.http_service.post<Login>("http://localhost:8080/api/verify_user",user_credentials,{observe : 'response'});
  }

  
}
