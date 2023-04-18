import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  createSubject(modal:any){
    return this.http.post(environment.baseApi+'subjects',modal)
  }
  updateSubject(modal:any,id:any){
    return this.http.put(environment.baseApi+'subjects/'+id,modal)
  }

  getAllSubjects(){
    return this.http.get(environment.baseApi+'subjects')
  }
  getSubject(id:any){
    return this.http.get(environment.baseApi+'subjects/'+id)
  }
  deleteSubject(id:any){
    return this.http.delete(environment.baseApi+"subjects/"+id)
  }
}
