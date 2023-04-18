import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  constructor(private fb:FormBuilder,
    private toaster:ToastrService,
    private route:Router,
    private serve:AuthService) { }

  userForm!:FormGroup
  users:any[]=[]


  ngOnInit(): void {
    this.createForm()
    this.getUsers()
  }

  createForm(){
    this.userForm=this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      confirmPassword:['',Validators.required],
    })
  }

  getUsers(){
    this.serve.getAllUsers('students').subscribe((res:any)=>{
      this.users=res
    })
  }

  submit(){
    let MODAL={
      username:this.userForm.value.username,
      email:this.userForm.value.email,
      password:this.userForm.value.password,
    }

    let index = this.users.findIndex(item=>item.email == this.userForm.value.email)
    if(index !== -1){
      this.toaster.error("الاميل موجود مسبقا","هناك خطأ")
    }
    else{
      this.serve.createUser(MODAL).subscribe((res:any)=>{
        this.toaster.success('تم انشاء احساب',"مبروك")
        let MODEL={
          username:res.username,
          userId:res.id,
          rol:'students'
        }
        this.serve.loginUser(MODEL).subscribe((res:any)=>{
          this.serve.user.next(res)
        })
        this.route.navigate(['/subjects'])
      })
    }
  }
   

}
