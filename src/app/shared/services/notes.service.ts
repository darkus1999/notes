import { Injectable } from '@angular/core';
import {
  BookModel,
  BookModelIdOpcional,
  NoteModel,
} from '../../core/models/books';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private openRequest = indexedDB.open('DBNoteBook', 2);
  private db?: IDBDatabase;
  private dbReady?: Promise<IDBDatabase>;
  books: BookModel[] = [];

  constructor() {
    this.dbReady = this.openDatabase();
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      this.openRequest.onupgradeneeded = this.upgradeIndexedDb;
      this.openRequest.onerror = (event: Event) => {
        const err = (event.target as IDBOpenDBRequest).error;
        reject(err);
      };
      this.openRequest.onsuccess = (event: Event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        resolve(this.db);
      };
    });
  }

  private upgradeIndexedDb = (event: Event) => {
    this.db = (event.target as IDBOpenDBRequest).result;
    if (!this.db.objectStoreNames.contains('book')) {
      this.db.createObjectStore('book', {
        keyPath: 'id',
        autoIncrement: true,
      });
    }
    if (!this.db.objectStoreNames.contains('note')) {
      this.db.createObjectStore('note', {
        keyPath: 'id',
        autoIncrement: true,
      });
    }
  };
  getAllBook(): Promise<BookModel[]> {
    const request = new Promise<BookModel[]>((resolve, reject) => {
      if (!this.dbReady) {
        reject(new Error('La base de datos no está disponible')); // Rechaza la promesa si la base de datos no está disponible
        return;
      }
      this.dbReady.then((db: IDBDatabase) => {
        const listBook: BookModel[] = [];
        const transaction = db.transaction(['book'], 'readonly');
        const objectStore = transaction.objectStore('book');
        objectStore.getAll().onsuccess = (event: Event) => {
          const result = (event.target as IDBRequest).result;
          resolve(result);
        };
      });
    });
    return request;
  }
  createBook(book: BookModel): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not available'));
        return;
      }
      let transaction = this.db.transaction('book', 'readwrite');
      let books = transaction.objectStore('book');
      let bookCopy: BookModelIdOpcional = { ...book };
      delete bookCopy.id;
      let request = books.add(bookCopy);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(new Error(request.error?.message));
      };
    });
    return promise;
  }
  editBook(book: BookModel): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not available'));
        return;
      }
      let transaction = this.db.transaction('book', 'readwrite');
      let books = transaction.objectStore('book');
      let request = books.put(book);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(new Error(request.error?.message));
      };
    });
    return promise;
  }
  deleteBook(idBook: number): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not available'));
        return;
      }
      let transaction = this.db.transaction('book', 'readwrite');
      let books = transaction.objectStore('book');
      let request = books.delete(idBook);
      request.onsuccess = () => {
        resolve(request.result);
      };
      request.onerror = () => {
        reject(new Error(request.error?.message));
      };
    });
    return promise;
  }
  createNote(note: NoteModel) {
    if (!this.db) return;
    let transaction = this.db.transaction('note', 'readwrite');
    let notes = transaction.objectStore('note');
    let request = notes.add(note);
    request.onsuccess = function () {
      console.log('Libro agregado al almacén', request.result);
    };
    request.onerror = function () {
      console.log('Error', request.error);
    };
  }
}
