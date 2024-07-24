import { ApiProperty } from "@nestjs/swagger"
import { IsEmail , IsNotEmpty, IsString, Length } from "class-validator"

export class LoginDto{
    @ApiProperty()
    @IsString()
    @Length(6,20)
    @IsNotEmpty()
    password : string

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email:  string

}