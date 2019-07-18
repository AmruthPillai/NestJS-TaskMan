import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../database.module';
import { taskProviders } from './task.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService],
})
export class TasksModule {}
