import { IsDefined, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ required: true, minLength: 3, maxLength: 45 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(45)
  name: string;

  @ApiProperty({ required: true, minLength: 3, maxLength: 255 })
  @IsDefined()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  description: string;
}
