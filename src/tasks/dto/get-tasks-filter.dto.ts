import { TaskStatus } from '../task.model';

export class GetTasksFilterDTO {
  status: TaskStatus;
  search: string;
}
