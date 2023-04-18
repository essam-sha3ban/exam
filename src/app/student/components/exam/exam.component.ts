import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DoctorService } from 'src/app/doctor/services/doctor.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  id: any;
  subject: any;
  user: any
  total:number=0
  studentInfo:any
  showResult:boolean=false
  userSubjects:any[]=[]
  validExam:boolean=true
  constructor(private route: ActivatedRoute,
    private dService: DoctorService,
    private auth: AuthService,
    private toaster: ToastrService) {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getSubjects()
    this.getLoggedInUer()
  }
  ngOnInit(): void {

  }

  getSubjects() {
    this.dService.getSubject(this.id).subscribe((res: any) => {
      this.subject = res
    })
  }

  getLoggedInUer() {
    this.auth.getRole().subscribe(res => {
      this.user = res
      this.getUserData()
    })
  }
 getUserData(){
  this.auth.getStudent(this.user.userId).subscribe((res:any)=>{
    this.studentInfo=res
    this.userSubjects = res?.subjects ? res?.subjects:[]
  this.checkValidExam()
  })
 }
  delete(index: any) {
    this.subject.questions.splice(index, 1)
    let MODEL = {
      name: this.subject.name,
      questions: this.subject.questions
    }
    this.dService.updateSubject(MODEL, this.id).subscribe((res: any) => {
      this.toaster.success("تم حذف  السؤال بنجاح")
    })
  }

  getAnswer(event:any){
    let value = event.value
    let questionIndex = event.source.name
    this.subject.questions[questionIndex].studentAnswer = value
    console.log(this.subject.questions)
  }
  getRustle(){
   this.total=0
   for(let x in this.subject.questions){
    if(this.subject.questions[x].studentAnswer == this.subject.questions[x].correctAnswer){
        this.total++       
    }
   }
   this.showResult = true
   this.userSubjects.push({
        name:this.subject.name,
        id:this.id,
        degree:this.total
   })
   let MODEl={
    username:this.studentInfo.username,
    email:this.studentInfo.email,
    password:this.studentInfo.password,
    subjects:this.userSubjects
   }
   this.auth.updateStudent(this.user.userId,MODEl).subscribe(res=>{
    this.toaster.success('تم تسجيل احاباتك')
   })

  }

 checkValidExam(){
  for(let x in this.userSubjects){
    if(this.userSubjects[x].id == this.id){
      this.total=this.userSubjects[x].degree
      this.validExam=false
      this.toaster.warning('لقد قومت بحل هذا الاخنبار مسبقا')
    }
  }
  console.log(this.validExam)
 }
}
