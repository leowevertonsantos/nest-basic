import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";
import { EventsI } from "../interfaces/events.interfaces";

export class UpdateCategoryDTO {

    @IsString()
    @IsOptional()
    public description: string;

    @IsArray()
    @ArrayMinSize(1)
    public events: EventsI[];
    // public 
}