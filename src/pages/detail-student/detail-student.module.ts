import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailStudentPage } from './detail-student';

@NgModule({
  declarations: [
    DetailStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailStudentPage),
  ],
})
export class DetailStudentPageModule {}
