import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  // create-user-dto
  export class CreateSystemDto {
    @IsString()
    @IsNotEmpty()
    SystemName: string;
  
    @IsString()
    @IsNotEmpty()
    SystemURL: string;
  
  }
