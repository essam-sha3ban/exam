import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,
              private serve:AuthService,
              private toaster:ToastrService,
              private router:Router) { }

loginForm!:FormGroup
users:any[]=[]
type:string='students'

  ngOnInit(): void {
    this.createForm()
    this.getUsers()
  }

  createForm(){
      this.loginForm=this.fb.group({
        type:[this.type],
        email:['',[Validators.required,Validators.email]],
        password:['',Validators.required]
      })
  }

  getRole(event:any){
    this.type=event.value
    this.getUsers()
  }
  getUsers(){
    this.serve.getAllUsers(this.type).subscribe((res:any)=>{
      this.users=res
    })
  }

  submit(){
    
    let index=this.users.findIndex(item=>item.email==this.loginForm.value.email && item.password==this.loginForm.value.password)

    if(index==-1){
      this.toaster.error("البيانات المدخله خطأ")
    }
    else{
      let MODEL={
        username:this.users[index].username,
        userId:this.users[index].id,
        rol:this.type
      }
      this.serve.loginUser(MODEL).subscribe((res:any)=>{
        this.serve.user.next(res)
        this.toaster.success("تم تسجيل الدخول")
        this.router.navigate(['/subjects'])
      })
    }
  }


}
