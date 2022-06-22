import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIUrl  = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  getUserList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/users/');
  }

  getUser(id:any){
    return this.http.get<any>(this.APIUrl + '/users/', id);
  }

  addUser(val:any){
    return this.http.post(this.APIUrl + '/users/', val);
  }

  updateUser(val:any){
    return this.http.put(this.APIUrl + '/users/', val);
  }

  deleteUser(val:any){
    return this.http.delete(this.APIUrl + '/users/' + val);
  }

  
  login(val:any){
	return this.http.post(this.APIUrl + '/api/login/', val);
  }
  
  // getUserProfile(){
	//   return this.http.get(this.APIUrl + '/profile/');
  // }
  
  loggedIn(){
	return !!localStorage.getItem('token');
  }
  
  getToken(){
	return localStorage.getItem('token');
  }
	
	
  logout(){
	 localStorage.removeItem("token");
   localStorage.removeItem("role");
  }
}
