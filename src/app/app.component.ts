import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { StudentListPage } from "../pages/student-list/student-list";
import { AddStudentPage } from "../pages/add-student/add-student";
import { SearchStudentPage } from "../pages/search-student/search-student";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Adicionar Estudante', component: AddStudentPage },
      { title: 'Lista de Estudantes', component: StudentListPage },
      { title: 'Buscar Estudantes', component: SearchStudentPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title == "Home"){
      this.nav.setRoot(page.component);
    }else{
      this.nav.push(page.component);
    }
    
  }
}
