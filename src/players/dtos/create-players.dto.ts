import { IsEmail, IsNotEmpty } from "class-validator";

export class CreatePlayersDTO {

    @IsNotEmpty()
    public cellPhone: string;

    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public name: string;
} 