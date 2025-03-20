import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ClassConstructor } from 'class-transformer/types/interfaces';
import { ValidationError } from 'class-validator';

export class FormUtils {

    static async validateForm<T extends object>(dtoClass: ClassConstructor<T>, data: object): Promise<void> {

        const dtoInstance = plainToClass(dtoClass, data);

        const validationErrors = await validate(dtoInstance);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.flatMap((error: ValidationError) => {
                if (error.constraints) {
                    return Object.values(error.constraints);
                }
                return [];
            });

            throw new Error(errorMessages.join(', '));
        }
    }

}