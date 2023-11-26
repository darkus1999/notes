import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BookModel } from '../../../core/models/books';
import { NotesService } from '../../services/notes.service';

@Component({
  selector: 'app-card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.sass'],
})
export class CardBookComponent implements OnInit {
  listBooks: BookModel[] = [];
  bookForm: FormGroup;
  isActiveCreateBook: boolean;

  constructor(private noteService: NotesService, private fb: FormBuilder) {
    this.listBooks = this.noteService.books;
    this.isActiveCreateBook = true;
    this.bookForm = this.fb.group({
      id: '',
      title: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  ngOnInit(): void {
    this.getBooks();
  }

  async getBooks() {
    this.listBooks = await Promise.resolve(this.noteService.getAllBook());
  }
  addBook() {
    this.noteService.createBook(this.bookForm.value).then(() => {
      this.resetBookForm();
      this.getBooks();
    });
  }

  putBook() {
    this.noteService.editBook(this.bookForm.value).then(() => {
      this.isActiveCreateBook = true;
      this.resetBookForm();
      this.getBooks();
    });
  }

  deleteBook(idBook: number) {
    this.noteService.deleteBook(idBook).then(() => {
      this.getBooks();
    });
  }

  editBook(book: BookModel) {
    this.bookForm.patchValue({
      id: book.id,
      title: book.title,
      description: book.description,
      createdAt: book.createdAt,
      updatedAt: new Date(),
    });
    this.isActiveCreateBook = false;
  }

  cancelEditBook() {
    this.resetBookForm();
    this.isActiveCreateBook = true;
  }

  resetBookForm() {
    this.bookForm.reset({
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
