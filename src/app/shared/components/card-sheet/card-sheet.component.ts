import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-card-sheet',
  templateUrl: './card-sheet.component.html',
  styleUrls: ['./card-sheet.component.sass'],
})
export class CardSheetComponent implements OnInit {
  constructor(private noteService: NotesService) {}

  ngOnInit(): void {}
  addNote() {
    this.noteService.createNote({
      idbook: 1,
      title: '',
      description: '',
      updatedAt: new Date(),
      createdAt: new Date(),
    });
  }
}
