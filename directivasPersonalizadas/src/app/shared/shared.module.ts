import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrMsgDirective } from './directives/err-msg.directive';



@NgModule({
  declarations: [
    ErrMsgDirective
  ],
  exports: [
    ErrMsgDirective
  ]
})
export class SharedModule { }
