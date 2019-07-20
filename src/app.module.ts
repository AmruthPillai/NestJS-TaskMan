import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as config from 'config';

import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

const db: any = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: db.type,
      host: process.env.RDS_HOSTNAME || db.host,
      port: process.env.RDS_PORT || db.port,
      username: process.env.RDS_USERNAME || db.username,
      password: process.env.RDS_PASSWORD || db.password,
      database: process.env.RDS_DB_NAME || db.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.TYPEORM_SYNC || db.synchronize,
    }),
    TasksModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
