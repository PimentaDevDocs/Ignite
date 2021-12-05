import { ISpecificationRepository } from "../repository/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

export class SpecificationService {

    constructor(private specificationRepository: ISpecificationRepository) {
    }

    create({ name, description }: IRequest): void {

        const specificationAlreadyExists = this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists');
        }

        this.specificationRepository.create({ name, description });
    }
}
