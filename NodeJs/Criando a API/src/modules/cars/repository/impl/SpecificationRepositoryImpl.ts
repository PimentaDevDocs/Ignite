import { ISpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";
import { Specification } from "../../model/Specification";

export class SpecificationRepositoryImpl implements ISpecificationRepository {

    private specification: Specification[];

    constructor() {
        this.specification = [];
    }

    create({ name, description }: ISpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            createdAt: new Date()
        });

        this.specification.push(specification);
    }

    list(): Specification[] {
        return this.specification;
    }

    findByName(name: string): Specification | undefined {

        return this.specification.find(specification => specification.name === name);
    }
}
