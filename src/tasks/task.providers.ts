import { Connection } from 'typeorm';
import { TASK_REPOSITORY, DATABASE_CONNECTION } from '../constants';
import { Task } from './task.entity';

export const taskProviders = [
  {
    provide: TASK_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(Task),
    inject: [DATABASE_CONNECTION],
  },
];
