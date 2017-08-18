import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import{ FIREBASE_CREDENTIALS } from './firebase.credentials'
import { StudentListPage } from "../pages/student-list/student-list";
import { AddStudentPage } from "../pages/add-student/add-student";
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { EditStudentPage } from "../pages/edit-student/edit-student";
import { SearchStudentPage } from "../pages/search-student/search-student";
import { DetailStudentPage } from "../pages/detail-student/detail-student";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    StudentListPage,
    AddStudentPage,
    EditStudentPage,
    SearchStudentPage,
    DetailStudentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS), //Inicializa a conexão com o banco de dados do Firebase
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    StudentListPage,
    AddStudentPage,
    EditStudentPage,
    SearchStudentPage,
    DetailStudentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
