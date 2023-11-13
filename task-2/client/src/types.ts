export interface IStudent {
  id?: number;
  firstName: string;
  lastName: string;
  fatherName?: string;
  group: string;
  birthday: string;
}

export type IOperation = 'add' | 'delete' | 'show all' | undefined;
