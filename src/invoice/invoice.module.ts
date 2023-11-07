import { Module } from '@nestjs/common';
import { InvoiceService } from './service/invoice.service';
import { InvoiceController } from './controller/invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice, User])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
