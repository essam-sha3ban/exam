import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  name = new FormControl("");
  questionsForm!: FormGroup
  startAdd: boolean = false
  preview: boolean = false
  subjectNum: any;
  stepperIndex: any = 0
  questions: any[] = []
  correctNum: any
  id:any;



  constructor(private fb: FormBuilder, private toaster: ToastrService, private service: DoctorService) { }

  ngOnInit(): void {
    this.createForm()

  }
  start() {
    if (this.name.value == "") {
      this.toaster.error("يرجي تحديد اسم الماده")
    }
    else {
      this.subjectNum = this.name.value
      this.startAdd = true
    }
    if (this.startAdd) {
      this.stepperIndex = 1
    }
  }
  createForm() {
    this.questionsForm = this.fb.group({
      question: ['', Validators.required],
      answer1: ['', Validators.required],
      answer2: ['', Validators.required],
      answer3: ['', Validators.required],
      answer4: ['', Validators.required],

    })
  }
  createQuestion() {
    if (this.correctNum) {
      let MODEL = {
        question: this.questionsForm.value.question,
        answer1: this.questionsForm.value.answer1,
        answer2: this.questionsForm.value.answer2,
        answer3: this.questionsForm.value.answer3,
        answer4: this.questionsForm.value.answer4,
        correctAnswer: this.questionsForm.value[this.correctNum]
      }
      this.questions.push(MODEL)
      this.questionsForm.reset()
    }
    else {
      this.toaster.error("قم بتحديد الاجايه اولا")
    }
    console.log(this.questions)
  }

  getCorrect(event: any) {
    this.correctNum = event.value

  }
  submit() {
    let MODEL = {
      name: this.subjectNum,
      questions: this.questions
    }

    if (this.preview) {
      this.stepperIndex = 2
    }
    else {
      this.service.createSubject(MODEL).subscribe((res: any) => {
        this.preview = true
        this.id=res.id
      })
    }
  }
  clearForm() {
    this.questionsForm.reset()
  }
  exit() {
    this.questionsForm.reset()
    this.questions = []
    this.stepperIndex = 0
    this.subjectNum = ''
    this.startAdd = false
    this.name.reset()
  }


  delete(index:any){
  this.questions.splice(index,1)
  let MODEL = {
    name: this.subjectNum,
    questions: this.questions
  }
  this.service.updateSubject(MODEL,this.id).subscribe((res:any)=>{
     this.toaster.success("تم حذف  السؤال بنجاح")
  })
  }
}