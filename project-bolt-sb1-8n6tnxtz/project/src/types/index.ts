export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  color?: string;
}

export interface Document {
  id: string;
  title: string;
  content?: any;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  collaborators: User[];
}

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  userId: string;
  documentId: string;
  user: User;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  createdAt: string;
  userId: string;
  user: User;
}