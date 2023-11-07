import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from '../entities/invoice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}
  async create(
    { description, dueDate, email, name, price, term }: CreateInvoiceDto,
    user,
  ) {
    try {
      const newInvoice = this.invoiceRepository.create({
        description,
        dueDate,
        email,
        name,
        price,
        term,
        user,
      });

      await this.invoiceRepository.save(newInvoice);

      return {
        message: 'CREATED',
        data: newInvoice,
        statusCode: 201,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async findAll(page: number, limit = 10) {
    try {
      const invoices = await this.invoiceRepository.find({
        take: limit,
        skip: (page - 1) * limit,
        order: {
          id: 'DESC',
        },
      });

      return {
        message: 'OK',
        data: invoices,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const foundInvoice = await this.invoiceRepository.findOneBy({ id });

      if (!foundInvoice) {
        throw new NotFoundException('invoice not found');
      }

      return {
        message: 'OK',
        data: foundInvoice,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async paidStatus(id: number) {
    try {
      const foundInvoice = await this.invoiceRepository.findOneBy({ id });

      if (!foundInvoice) {
        throw new NotFoundException('invoice not found');
      }

      if (foundInvoice.status === 1) {
        foundInvoice.status = 2;
      } else if (foundInvoice.status === 2) {
        foundInvoice.status = 1;
      }

      await this.invoiceRepository.save(foundInvoice);

      return {
        message: 'UPDATED',
        data: foundInvoice.status,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async update(
    id: number,
    { description, dueDate, email, name, price, term }: UpdateInvoiceDto,
  ) {
    try {
      const foundInvoice = await this.invoiceRepository.findOneBy({ id });

      if (!foundInvoice) {
        throw new NotFoundException('invoice not found');
      }

      await this.invoiceRepository.update(id, {
        description,
        dueDate,
        email,
        name,
        price,
        term,
      });

      return {
        message: 'UPDATED',
        data: null,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const foundInvoice = await this.invoiceRepository.findOneBy({ id });

      if (!foundInvoice) {
        throw new NotFoundException('invoice not found');
      }

      await this.invoiceRepository.remove(foundInvoice);

      return {
        message: 'DELETED',
        data: null,
        statusCode: 200,
      };
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
}
