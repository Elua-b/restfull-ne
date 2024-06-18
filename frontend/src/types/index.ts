export interface ILoginData {

  password: string;
  showPassword: boolean;
}
export interface IModel {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}

export interface IUser extends IModel {
 
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  status: string;
  verified: boolean;
  activationCode: string;
  token: null;

  roles: IRole[];
}

export interface IRole {
  id: string;
  roleName: string;
}
export interface INotification extends IModel {
  message: string;
  read: boolean;
  notId: string;
}
export interface IUsers extends IModel {
  country: string;
  firstName: string;
  lastName: string;

  email: string;
  joinedAt: string;
}

export interface ILibrary {
  name: string;
  publisher: string;
  publicYear: string;
  subject: string;
  author: string;
}
export interface ILibraryID {
  id: number;
  name: string;
  publisher: string;
  publicYear: string;
  subject: string;
  author: string;
}
