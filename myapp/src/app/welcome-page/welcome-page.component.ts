import { Router } from '@angular/router';
import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  isLoggedin:any;
  
  constructor(private service: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.go_route();
    document.querySelector('.title__main')?.classList.add('getStarted');
    document.querySelector('.cont-home')?.classList.add('cont-home-style');
    
  }
  ngOnDestroy(): void {
    document.querySelector('.title__main')?.classList.remove('getStarted');
    document.querySelector('.cont-home')?.classList.remove('cont-home-style');
  }

  logout():void{
    this.service.logout();
    this.router.navigateByUrl("/login");
  }


  loggedin(): any{
    return this.service.loggedIn();
  }

  go_route(): any{
    if (!this.loggedin()){
      this.router.navigateByUrl("/login")
    }
  }
}
