import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { InvoiceModule } from './invoice/invoice.module';
import { Invoice } from './invoice/entities/invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      entities: [User, Invoice],
    }),
    AuthModule,
    InvoiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
