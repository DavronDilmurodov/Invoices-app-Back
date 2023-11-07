import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { InvoiceService } from '../service/invoice.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { AuthGuard } from '../../guards/auth.guard';

@ApiTags('invoice')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiUnauthorizedResponse({
  status: 401,
  description: 'Please, provide token',
})
@ApiForbiddenResponse({ status: 403, description: 'Invalid token' })
@ApiNotFoundResponse({ status: 404, description: 'User not found' })
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @ApiCreatedResponse({
    status: 201,
    description: 'Invoice has been created successfully',
  })
  @Post()
  create(@Req() req, @Body() body: CreateInvoiceDto) {
    const user = req.user;
    return this.invoiceService.create(body, user);
  }

  @ApiOkResponse({ status: 200, description: 'Invoices list' })
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.invoiceService.findAll(page, limit);
  }

  @ApiOkResponse({ status: 200, description: 'Found Invoice' })
  @ApiNotFoundResponse({ status: 404, description: 'Invoice not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.findOne(id);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Invoice has been updated successfully',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Invoice not found' })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateInvoiceDto,
  ) {
    return this.invoiceService.update(id, body);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Status of invoice has been updated successfully',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Invoice not found' })
  @Put('/status/:id')
  paidStatus(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.paidStatus(id);
  }

  @ApiOkResponse({
    status: 200,
    description: 'Invoice has been successfully deleted',
  })
  @ApiNotFoundResponse({ status: 404, description: 'Invoice not found' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.invoiceService.remove(id);
  }
}
