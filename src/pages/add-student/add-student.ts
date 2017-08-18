import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Student } from "../../models/student/student.interface";
import { Nota } from "../../models/nota/nota.interface"
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';




/**
 * Generated class for the AddStudentPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-student',
  templateUrl: 'add-student.html',
})
export class AddStudentPage {

  public student = {} as Student;
  public studentRef: FirebaseListObservable<Student[]>


  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase, private alertCrtl: AlertController) {
    this.studentRef = this.database.list('student-list');
    this.student.notas = new Array();

  }



  public addNota(): void {
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
          handler: data => {
            console.log("Cancelou");
          }
        },
        {
          text: "Salvar nota",
          handler: data => {
            var x = {} as Nota;
            x.valor = Number(data.Nota);
            x.nome = data.Disciplina;
            this.student.notas.push(x);
          }
        }
      ]
    }).present();
  }

  public validarCpf(student: Student): boolean {
    var cpf_number = new Array(11);
    var ind_cpf = 0;
    var index_ponto1 = 3;
    var index_ponto2 = 7;
    var index_traco = 11;
    var soma_dig1 = 0;
    var soma_dig2 = 0;
    for (let i = 0; i < student.cpf.length; i++) {
      if ((i == index_ponto1 && student.cpf[i] != ".") || (i == index_ponto2 && student.cpf[i] != ".") || (i == index_traco && student.cpf[i] != "-")) {
        return false;
      } else if ((i != index_ponto1) && (i != index_ponto2) && (i != index_traco)) {
        cpf_number[ind_cpf] = Number(student.cpf[i]);
        ind_cpf++;
      }
    }

    for (let i = 0, j = cpf_number.length - 1; i < cpf_number.length - 2; i++ , j--) {
      soma_dig1 += cpf_number[i] * (j);
    }

    for (let i = 0, j = cpf_number.length; i < cpf_number.length - 1; i++ , j--) {
      soma_dig2 += cpf_number[i] * (j);
    }

    var verificador1 = (soma_dig1 * 10) % 11;
    var verificador2 = (soma_dig2 * 10) % 11;
    if (verificador1 == 10) {
      verificador1 = 0;
    }
    if (verificador2 == 10) {
      verificador2 = 0;
    }
  
    if (verificador1 == cpf_number[ind_cpf - 2] && verificador2 == cpf_number[ind_cpf - 1]) {
      return true;
    } else {
      return false;
    }
  }


  public addStudent(student: Student): void {
    if(this.validarCpf(student)){
      this.studentRef.push(this.student);
      this.student = {} as Student;
      this.navCtrl.pop();
    }else{
      alert("CPF inválido");
    }
    
  }
}
