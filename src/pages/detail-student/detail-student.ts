import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Student } from "../../models/student/student.interface";
import { Subscription } from 'rxjs/Subscription';


/**
 * Generated class for the DetailStudentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-student',
  templateUrl: 'detail-student.html',
})
export class DetailStudentPage {

  public studentSubscription: Subscription;
  public studentRef: FirebaseObjectObservable<Student>
  public student = {} as Student;
  public media:number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    const studentId = this.navParams.get('studentId');
    this.studentRef = this.database.object(`student-list/${studentId}`);
    this.studentSubscription = this.studentRef.subscribe(student => this.student = student);
    if(this.student.notas == undefined){
      this.media = 0;
    }else{
      var soma = 0;
      for(var i=0; i < this.student.notas.length; i++){
          soma+= this.student.notas[i].valor;
      }
      this.media = soma/this.student.notas.length;    }
  }


  ionViewWillLeave(){
    this.studentSubscription.unsubscribe();
  }
}
