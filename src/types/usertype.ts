export interface User {
  firstName: string;
  lastName: string;
  mail: string;
  selectedGender: string;
  pwd: string;
  isChecked: boolean;
  id: number;
}

export interface Post {
  title: string;
  description: string;
  img: string;
  time: string;
  id: number;
}
