import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from "@nestjs/common";

@Injectable()
export class ErrorHandlerService {
    internalServerError(error : string) : never {
        throw new InternalServerErrorException("Error: " + error);
    }
}