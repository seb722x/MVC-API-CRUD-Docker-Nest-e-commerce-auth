import { Module } from '@nestjs/common';
import { CommonCrudService } from './commonCrud.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseExceptionService } from './commonExceptions.service';

@Module({
    providers: [
        CommonCrudService, DatabaseExceptionService
    ],
    exports: [ CommonCrudService ],
    imports:[ TypeOrmModule.forFeature([])]
})
export class CommonModule {}
