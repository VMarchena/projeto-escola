import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Student } from "../../models/student/student.interface";
import { FirebaseListObservable, AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { EditStudentPage } from "../edit-student/edit-student";
import { DetailStudentPage } from "../detail-student/detail-student";
import { Subscription } from "rxjs/Subscription";

/**
 * Generated class for the SearchStudentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-student',
  templateUrl: 'search-student.html',
})
export class SearchStudentPage {

 
  public studentSubscription: Subscription;
  public busca:string;
  public parametro: string;
  public studentListRef: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: AngularFireDatabase, private actionSheetCrtl: ActionSheetController) {
    this.studentListRef = this.database.list('student-list',{
      query: {
      orderByChild: 'nome'
      }
      });
      
  }


  
  public searchStudent(busca:string,parametro:string):void{
    this.studentListRef = this.database.list('student-list',{
      query: {
      orderByChild: busca.toLowerCase(),
      equalTo: parametro 
      }
      });
      
  }

  public cleanSearch():void{
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
