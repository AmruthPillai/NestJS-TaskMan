import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, TasksModule],
})
export class AppModule {}
