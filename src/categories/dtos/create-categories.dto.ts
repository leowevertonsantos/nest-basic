import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { EventsI } from "../interfaces/events.interfaces";

export class CreateCategoryDTO {

    @IsString()
    @IsNotEmpty()
    public readonly category: string;

    @IsString()
    @IsNotEmpty()
    public description: string;

    @IsArray()
    @ArrayMinSize(1)
    public events: Array<EventsI>;


}