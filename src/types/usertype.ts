export interface User {
  firstName: string;
  lastName: string;
  mail: string;
  selectedGender: string;
  pwd: string;
  isChecked: boolean;
  role: string;
  id: number;
}

export interface AddUserModalProps {
  mode: 'add';
}

export interface EditUserModalProps {
  mode: 'edit';
  user: User;
}

export type UserModalProps = AddUserModalProps | EditUserModalProps;
