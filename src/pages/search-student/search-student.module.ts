import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchStudentPage } from './search-student';

@NgModule({
  declarations: [
    SearchStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchStudentPage),
  ],
})
export class SearchStudentPageModule {}
