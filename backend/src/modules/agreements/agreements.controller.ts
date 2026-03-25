import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UseGuards,
  Res,
  Header,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { Response } from "express";
import { AgreementsService } from "./agreements.service";
import { CreateAgreementDto } from "./dto/create-agreement.dto";
import { UpdateAgreementDto } from "./dto/update-agreement.dto";
import { RecordPaymentDto } from "./dto/record-payment.dto";
import { TerminateAgreementDto } from "./dto/terminate-agreement.dto";
import { QueryAgreementsDto } from "./dto/query-agreements.dto";
import { AuditLogInterceptor } from "../audit/interceptors/audit-log.interceptor";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Rent Agreements")
@ApiBearerAuth("JWT-auth")
@UseGuards(JwtAuthGuard)
@Controller("agreements")
@UseInterceptors(AuditLogInterceptor)
export class AgreementsController {
  constructor(private readonly agreementsService: AgreementsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new rent agreement',
    description:
      'Creates a new rental agreement between landlord, tenant, and optionally an agent. Includes Stellar wallet addresses for blockchain-based payments and escrow.',
  })
  @ApiResponse({
    status: 201,
    description: 'Agreement created successfully',
    schema: {
      example: {
        id: 'uuid-string',
        propertyId: 'property-uuid',
        landlordId: 'landlord-uuid',
        tenantId: 'tenant-uuid',
        agentId: 'agent-uuid',
        landlordStellarPubKey:
          'GD5DJ3B6A2KHWGFPJGBM4D7J23G5QJY6XQFQKXQ2Q2Q2Q2Q2Q2Q2Q',
        tenantStellarPubKey:
          'GD7J3B6A2KHWGFPJGBM4D7J23G5QJY6XQFQKXQ2Q2Q2Q2Q2Q2Q2Q',
        monthlyRent: 1500.0,
        securityDeposit: 3000.0,
        agentCommissionRate: 5.0,
        startDate: '2024-02-01',
        endDate: '2025-01-31',
        status: 'ACTIVE',
        createdAt: '2024-01-26T17:32:00.000Z',
        updatedAt: '2024-01-26T17:32:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or validation errors',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  @AuditLog({
    action: AuditAction.CREATE,
    entityType: 'RentAgreement',
    level: AuditLevel.INFO,
    includeNewValues: true,
  })
  async create(@Body() createAgreementDto: CreateAgreementDto) {
    return await this.agreementsService.create(createAgreementDto);
  }

  @Get()
  async findAll(@Query() query: QueryAgreementsDto) {
    return await this.agreementsService.findAll(query);
  }

  @Get(":id/download")
  @Header("Content-Type", "application/pdf")
  async downloadAgreement(@Param("id") id: string, @Res() res: Response) {
    const buffer = await this.agreementsService.generateAgreementPdf(id);
    res.set({
      "Content-Disposition": `attachment; filename=agreement-${id}.pdf`,
      "Content-Length": buffer.length,
    });
    res.end(buffer);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.agreementsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update an agreement',
    description:
      'Update existing rental agreement details. Only fields provided in the request body will be modified.',
  })
  @ApiParam({
    name: 'id',
    description: 'Agreement UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Agreement updated successfully',
    schema: {
      example: {
        id: 'uuid-string',
        propertyId: 'property-uuid',
        monthlyRent: 1600.0,
        status: 'ACTIVE',
        updatedAt: '2024-01-26T18:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Agreement not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data or validation errors',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @AuditLog({
    action: AuditAction.UPDATE,
    entityType: 'RentAgreement',
    level: AuditLevel.INFO,
    includeOldValues: true,
    includeNewValues: true,
  })
  async update(
    @Param('id') id: string,
    @Body() updateAgreementDto: UpdateAgreementDto,
  ) {
    return await this.agreementsService.update(id, updateAgreementDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Terminate an agreement',
    description:
      'Soft-delete a rental agreement by marking it as terminated. Requires termination reason and optionally notes.',
  })
  @ApiParam({
    name: 'id',
    description: 'Agreement UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Agreement terminated successfully',
    schema: {
      example: {
        id: 'uuid-string',
        status: 'TERMINATED',
        terminationReason: 'Mutual agreement',
        terminatedAt: '2024-01-26T18:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Agreement not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid termination reason or agreement already terminated',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @AuditLog({
    action: AuditAction.UPDATE,
    entityType: 'RentAgreement',
    level: AuditLevel.WARN,
    includeOldValues: true,
    includeNewValues: true,
  })
  async terminate(
    @Param('id') id: string,
    @Body() terminateDto: TerminateAgreementDto,
  ) {
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateAgreementDto: UpdateAgreementDto) {
    return await this.agreementsService.update(id, updateAgreementDto);
  }

  @Delete(":id")
  async terminate(@Param("id") id: string, @Body() terminateDto: TerminateAgreementDto) {
    return await this.agreementsService.terminate(id, terminateDto);
  }

  @Post(":id/pay")
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Record a payment for an agreement',
    description:
      'Record a rental payment for a specific agreement. Can be used for both manual payment recording and blockchain payment confirmation.',
  })
  @ApiParam({
    name: 'id',
    description: 'Agreement UUID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 201,
    description: 'Payment recorded successfully',
    schema: {
      example: {
        id: 'payment-uuid',
        agreementId: 'agreement-uuid',
        amount: 1500.0,
        paymentDate: '2024-01-26',
        paymentMethod: 'Stellar Transfer',
        referenceNumber: 'stellar-tx-hash',
        status: 'COMPLETED',
        createdAt: '2024-01-26T18:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Agreement not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid payment amount or date',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required',
  })
  @AuditLog({
    action: AuditAction.PAYMENT_COMPLETED,
    entityType: 'Payment',
    level: AuditLevel.INFO,
    includeNewValues: true,
  })
  async recordPayment(
    @Param('id') id: string,
    @Body() recordPaymentDto: RecordPaymentDto,
  ) {
  async recordPayment(@Param("id") id: string, @Body() recordPaymentDto: RecordPaymentDto) {
    return await this.agreementsService.recordPayment(id, recordPaymentDto);
  }

  @Get(":id/payments")
  async getPayments(@Param("id") id: string) {
    return await this.agreementsService.getPayments(id);
  }
}
