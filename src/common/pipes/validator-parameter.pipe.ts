import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidatorParameter implements PipeTransform {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    transform(value: any, metadata: ArgumentMetadata): any {
        if (!value) {
            throw new BadRequestException(`The value of parametter ${metadata.data} should be pass`);
        }
        return value;
    }

}