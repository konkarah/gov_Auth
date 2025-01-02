import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  // create-user-dto
  export class CreateDesignationDto {
    @IsString()
    DesignationName: string;
  
    @IsString()
    Department: string;
  
  }

