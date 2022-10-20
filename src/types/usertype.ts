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

export type UserProps = {
  user: User;
};
