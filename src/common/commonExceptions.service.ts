import {
    BadRequestException,
    NotFoundException,
    ConflictException,
    InternalServerErrorException,
    UnprocessableEntityException,
    UnauthorizedException,
    ForbiddenException,
    ServiceUnavailableException,
    GatewayTimeoutException,
    Logger,
  } from '@nestjs/common';
  
  export class DatabaseExceptionService {
    private readonly logger = new Logger(DatabaseExceptionService.name);

    handleDBExceptions(error: any): void {
      try {
        if (error.code === '23505') {
          throw new ConflictException(error.detail);
        }
  
        if (error.code === '23503') {
          throw new NotFoundException('Related record not found');
        }
  
        if (error.code === '22P02') {
          throw new UnprocessableEntityException('Invalid data format');
        }
  
        if (error.code === '23514') {
          throw new UnprocessableEntityException('Check constraint violation');
        }
  
        if (error.code === '22001') {
          throw new BadRequestException('Field length exceeds maximum allowed');
        }
  
        if (error.code === '08P01') {
          throw new ServiceUnavailableException('Communication protocol problem');
        }
  
        if (error.code === '57014') {
          throw new GatewayTimeoutException('Operation timed out');
        }
  
        this.logError(error);
  
        throw new InternalServerErrorException(
          'Unexpected database error, check server logs'
        );
      } catch (error) {
        throw new InternalServerErrorException(
          'Unexpected error while handling database exception'
        );
      }
    }
  
    private logError(error: any): void {
      this.logger.error('Database exception:', error);

    }
  }