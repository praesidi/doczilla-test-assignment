import { ITask } from '../types';

export default function getTasksSortedByDate(
  tasks: ITask[] | null,
  option: string
) {
  if (option === 'from new' && tasks) {
    return [...tasks].sort((a: ITask, b: ITask) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } else if (option === 'from old' && tasks) {
    return [...tasks].sort((a: ITask, b: ITask) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }
  return tasks;
}
