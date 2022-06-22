import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: SharedService, private router: Router,
    private activatedRoute: ActivatedRoute,
    private title: Title) { }

  userLoginReactiveForm: any;
  adminLoginReactiveForm: any;

  ngOnInit(): void {

    

    this.userLoginReactiveForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.minLength(5)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });

    this.adminLoginReactiveForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.minLength(5)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });

    this.title.setTitle("Login")

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



  login(form: FormGroup) {

    this.service.login(form.value).subscribe(
      (res: any) => {
        if (res['access']) {
          localStorage.setItem('token', res['access']);
        }
        this.router.navigateByUrl("/")
            form.reset();
      },
    );
  }

  loggedin(): any{
    return this.service.loggedIn();
  }

  go_route(): any{
    if (this.loggedin()){
      this.router.navigateByUrl("/");
    }
  }

  

}
