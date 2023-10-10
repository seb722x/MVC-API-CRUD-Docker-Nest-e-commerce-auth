import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';



export class CreateProductDto {

    @ApiProperty({
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    price: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number; 

    @ApiProperty()
    @IsString()
    @IsOptional()
    category?: string; 

    
}
