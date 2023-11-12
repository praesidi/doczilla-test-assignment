import { ITask } from '../types';

export default function getUnfinishedTasks(tasks: ITask[] | null) {
  const newTasks = tasks?.filter((task) => task.status === false);

  if (newTasks === undefined) return null;

  return newTasks;
}
