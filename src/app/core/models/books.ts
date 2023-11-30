export interface NoteModel {
  id?: number;
  idbook: number;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface BookModel extends BookModelIdOpcional {
  id: number;
}
export interface BookModelIdOpcional {
  id?: number;
  title: string;
  phone: string;
  email: string;
  responsible: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
