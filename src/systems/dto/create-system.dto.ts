import {
    IsEmail,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  // create-user-dto
  export class CreateSystemDto {
    @IsString()
    SystemName: string;
  
    @IsString()
    SystemURL: string;
  
  }
