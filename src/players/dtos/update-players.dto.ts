import { IsNotEmpty } from "class-validator";

export class UpdatePlayersDTO {
    @IsNotEmpty()
    public cellPhone: string;

    @IsNotEmpty()
    public name: string;
}