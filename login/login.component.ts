import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../models/Login';
import { AuthenticationService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  username: string;
  password : string;
  rolename : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private authenticationService: AuthenticationService, private router: Router,private route: ActivatedRoute) 
  { }

  formErrors={          //error java type object

    'username':'',
    'password':''
  };


  validationMessages={

    'username':{
      'required':'Username is required',
      'minlength':'Must be at least 2 characters long',
      'maxlength':"Cannot be more than 25 characters long"
    },

    'password':{
      'required':'Password is required'
    }
  }

 
  ngOnInit(){
  }

  handleLogin() {
    let userobject:Login = {
        "userName":this.username,
        "password":this.password,
        "lastLogin":null,
        "rolename":this.rolename
    };

    
    this.authenticationService.verifyUser(userobject).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      if(result.body.rolename =='USER')
      {
      this.router.navigate(['/home']);
      }
      if(result.body.rolename =='ADMIN')
      {
      this.router.navigate(['/admin']);
      }
      console.log(result.body.rolename);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

   }
  

