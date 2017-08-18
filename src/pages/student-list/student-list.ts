import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Student } from "../../models/student/student.interface";
import { EditStudentPage } from "../edit-student/edit-student";
import { DetailStudentPage } from "../detail-student/detail-student";
/**
 * Generated class for the StudentListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student-list',
  templateUrl: 'student-list.html',
})
export class StudentListPage {

  public studentListRef: FirebaseListObservable<Student[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private actionSheetCrtl: ActionSheetController) {
    this.studentListRef = this.database.list('student-list',{
      query: {
      orderByChild: 'nome'
      }
      });
    
  }
  
  public selectStudent(student: Student): void{
    this.actionSheetCrtl.create({
      title: `${ student.nome }`,
      buttons: [
        {
          text:'Editar',
          handler: () => {
              this.navCtrl.push(EditStudentPage,{ 
                studentId: student.$key
              });
          }
        },
        {
          text:'Deletar',
          role: 'destructive',
          handler: ()=>{
            this.studentListRef.remove(student.$key);
          }
        },
        {
          text: 'Detalhes',
          handler: ()=>{
            this.navCtrl.push(DetailStudentPage,{
              studentId: student.$key
            });
          }
        },
        {
          text:'Cancelar',
          role: 'cancel',
        }
      ]
    }).present();
  }
  

}
