import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
} from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { CardBookComponent } from './components/card-book/card-book.component';
import { CardSheetComponent } from './components/card-sheet/card-sheet.component';
@NgModule({
  declarations: [CardSheetComponent, CardBookComponent],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot(),
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    QuillModule.forRoot(),
    ReactiveFormsModule,
  ],
  exports: [CardSheetComponent, CardBookComponent],
})
export class SharedModule {}
