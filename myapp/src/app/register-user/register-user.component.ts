import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private service: SharedService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title) { }

    userRegisterReactiveForm: any;

  ngOnInit(): void {
    this.go_route();

    this.userRegisterReactiveForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.minLength(5)]),
      "email": new FormControl(null, [Validators.required, Validators.minLength(5)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });

    this.title.setTitle("Register")

    this.error();
    
  }

  error(): boolean {
    return this.activatedRoute.snapshot.queryParams["error"] !== undefined;
  }


  getClass(form: any, fieldname: any): string {
    let classList = "form-control ";

    if (form.get(fieldname).invalid && form.get(fieldname).touched) {
      classList += "is-invalid"
    } else {
      classList += "is-valid"
    }

    return classList;
  }

  register(form: FormGroup) {

    this.service.addUser(form.value).subscribe(
      (res: any) => {
        if (res['message']){
          alert(res['message']);
        }

        if (res['statusCode']==201){
          this.router.navigateByUrl("/login")
          form.reset();
        }
        
      }
    );
  }

  loggedin(): any{
    return this.service.loggedIn();
  }

  go_route(): any{
    if (this.loggedin()){
      this.router.navigateByUrl("/")
    }
  }

}
