import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException, Logger } from '@nestjs/common';
import { Repository, EntityTarget, UpdateResult } from 'typeorm';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder'; 
import { PaginationDto } from './dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { DatabaseExceptionService } from './commonExceptions.service';

@Injectable()
export class CommonCrudService<T> {

  private readonly logger = new Logger('Common CRUD Service');

  constructor(
    private readonly dbExceptionService: DatabaseExceptionService
  ) {}

  
  async createBuilder(
    queryBuilder: SelectQueryBuilder<T>,
    data: Record<string, any>,
  ): Promise<T> {
    try {
      const result = await queryBuilder.insert().values(data).execute();
        
      const insertedRecord = await queryBuilder
        .where(`${queryBuilder.alias}.id = :id`, { id: result.identifiers[0].id })
        .getOne();

      return insertedRecord;
    } catch (error) {
      console.log(error);
      
    }
  }

  async findAllBuilder(
    queryBuilder: SelectQueryBuilder<T>,
    paginationDto: PaginationDto,
  ): Promise<T[]> {
    try {
      const { limit = 10, offset = 0 } = paginationDto;

      const entities = await queryBuilder
        .skip(offset)
        .take(limit)
        .getMany();

      return entities;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async findOneBuilder(queryBuilder: SelectQueryBuilder<T>, term: string): Promise<T | undefined> {
   

    let entity: T | undefined;

    if (isUUID(term)) {
      entity = await queryBuilder
        .where(`${queryBuilder.alias}.id = :id`, { id: term })
        .getOne();
    } else {
      entity = await queryBuilder
        .where(`UPPER(${queryBuilder.alias}.name) = :name`, { name: term.toUpperCase() })
        .getOne();
    }

    return entity;
  }
 


  async updateWithQueryBuilder(
    queryBuilder: SelectQueryBuilder<T>,
    id: string,
    updateDto: Record<string, any>,
   
  ): Promise<T | undefined> {
    const existingEntity = await queryBuilder
      .where(`${queryBuilder.alias}.id = :id`, { id })
      .getOne();

    if (!existingEntity) {
      throw new NotFoundException(`Registro con id '${id}' no encontrado.`);
    }

    const updatedEntity = { ...existingEntity, ...updateDto };
    console.log(updatedEntity);
    
    try {
      const result: UpdateResult = await queryBuilder
        .update()
        .set(updatedEntity)
        .where(`${queryBuilder.alias}.id = :id`, { id })
        .execute();

      if (result.affected === 0) {
        throw new NotFoundException(`Registro con id '${id}' no encontrado.`);
      }

      return updatedEntity;
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return
  }


  async deleteAllWithQueryBuilder(queryBuilder: SelectQueryBuilder<T>): Promise<void> {
    try {
      const result = await queryBuilder.delete().execute();

      if (result.affected === 0) {
        throw new NotFoundException(`No se encontraron registros para eliminar.`);
      }
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }


  async removeWithQueryBuilder(queryBuilder: SelectQueryBuilder<T>, id: string): Promise<void> {
    try {

      console.log(queryBuilder.alias);
      
      const result = await queryBuilder
        .delete()
        .where(`${queryBuilder.alias}.id = :id`, { id })
        .execute();

      //if (result.affected === 0) {
      //  throw new NotFoundException(`Registro con id '${id}' no encontrado.`);
      //}
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }






  private handleDBExceptions(error: any) {
    this.dbExceptionService.handleDBExceptions(error);

  }

 
}