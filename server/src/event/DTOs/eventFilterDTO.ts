import { IsOptional } from "class-validator";

export class EventFilterDTO{
    @IsOptional()
    name: string;

    @IsOptional()
    minDate: Date;

    @IsOptional()
    maxDate: Date;

    @IsOptional()
    minCapacity: number;

    @IsOptional()
    maxCapacity: number;
}