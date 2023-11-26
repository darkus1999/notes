export interface NoteModel {
  id?: number;
  idbook: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BookModel {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
