import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  dataSource:any
  dataTable:any
  displayedColumns:any
  constructor(private service:AuthService) {
    this.displayedColumns = ['position', 'name', 'subjectName', 'degree'];
   }

  
  ngOnInit(): void {
    this.getStudents()
  }

  getStudents(){
    this.service.getAllUsers('students').subscribe((res:any)=>{
      this.dataSource=res?.map((student:any)=>{
        if(student?.subjects){
          return student?.subjects?.map((sub:any)=>{
            return{
              name:student.username,
              subject:sub.name,
              degree:sub.degree
            }
          })
        }
       else{
        return[{
          name:student.username,
          subject:'-',
          degree:'-'
        }]
       }
      })
      this.dataTable=[]
      this.dataSource.forEach((item:any) => {
         item.forEach((subItem:any)=>{
          this.dataTable.push({
            name:subItem.name,
            subjectName:subItem.subject,
            degree:subItem.degree
          })
         })
      })
      console.log(this.dataTable)
    })
  }
    
}
