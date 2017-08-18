import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Student } from "../../models/student/student.interface";
import { Nota } from "../../models/nota/nota.interface";
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the EditStudentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-student',
  templateUrl: 'edit-student.html',
})
export class EditStudentPage {

  public studentSubscription: Subscription;
  public studentRef: FirebaseObjectObservable<Student>
  public student = {} as Student;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private alertCrtl: AlertController) {
    const studentId = this.navParams.get('studentId');
    this.studentRef = this.database.object(`student-list/${studentId}`);
    this.studentSubscription = this.studentRef.subscribe(student => this.student = student);
    if(this.student.notas == undefined){
      this.student.notas = new Array();
    }
  }

  public editStudent(student:Student): void{
    this.studentRef.update(student);
    this.navCtrl.pop();
  }

  public addNota(): void{
    this.alertCrtl.create({
      title: 'Adicione uma Nota',
      message: 'Digite a disciplina e a nota',
      inputs: [
        {
          name: 'Disciplina',
          placeholder: "Nome da disciplina",
          type: 'text'
        },
        {
          name: 'Nota',
          placeholder: "Nota da disciplina",
          type: 'number'
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel',
          handler: data=>{
            console.log("Cancelou");
          }
        },
        {
          text: "Salvar nota",
          handler: data=>{
            var x = {} as Nota;
            x.valor = Number(data.Nota);
            x.nome = data.Disciplina;
            this.student.notas.push(x);
          }
        }
      ]
    }).present();
  }

  public editNota(index:number): void{
    this.alertCrtl.create({
      title: 'Adicione uma Nota',
      message: 'Digite a disciplina e a nota',
      inputs: [
        {
          name: 'Disciplina',
          placeholder: this.student.notas[index].nome,
          type: 'text'
        },
        {
          name: 'Nota',
          placeholder: String(this.student.notas[index].valor),
          type: 'number'
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: 'cancel',
        },
        {
          text: "Salvar nota",
          handler: data=>{
            var x = {} as Nota;
            x.valor = Number(data.Nota);
            x.nome = data.Disciplina;
            this.student.notas[index].nome = x.nome;
            this.student.notas[index].valor = x.valor;
          }
        }
      ]
    }).present();
  }


  ionViewWillLeave(){
    this.studentSubscription.unsubscribe();
  }

}
