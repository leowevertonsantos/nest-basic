import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';
import { ChallengeStatus } from '../interfaces/challenge-status.enum';

export class ChallengeStatusValidatorPipe implements PipeTransform {

    readonly statusAllowed = [
        ChallengeStatus.AGREED,
        ChallengeStatus.DENIED,
        ChallengeStatus.CANCEL
    ];


    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    transform(value: any) {
        const status = value.status.toUpperCase();

        if (!this.statusAllowed.includes(status)) {
            throw new BadRequestException(`${status} is a invalid status`);
        }

    }

}
