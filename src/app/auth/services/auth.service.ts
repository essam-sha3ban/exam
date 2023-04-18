import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new Subject
  constructor(private http: HttpClient) { }

  createUser(modal: any) {
    return this.http.post(environment.baseApi + 'students', modal)
  }

  getAllUsers(type: string) {
    return this.http.get(environment.baseApi + type)

  }


  loginUser(modal: any) {
    return this.http.put(environment.baseApi + 'login/1', modal)
  }

  getStudent(type:string){
    return this.http.get(environment.baseApi+'students/'+type)
  }
  updateStudent(id:number,model:any){
    return this.http.put(environment.baseApi+'students/'+id, model)
  }


  getRole() {
    return this.http.get(environment.baseApi + 'login/1')
  }
}
