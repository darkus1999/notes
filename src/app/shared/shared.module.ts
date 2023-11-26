import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CardBookComponent } from './components/card-book/card-book.component';
import { CardSheetComponent } from './components/card-sheet/card-sheet.component';

@NgModule({
  declarations: [CardSheetComponent, CardBookComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [CardSheetComponent, CardBookComponent],
})
export class SharedModule {}
