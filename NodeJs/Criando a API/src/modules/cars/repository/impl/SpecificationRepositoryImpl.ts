import { Specification } from "../../entity/Specification";
import { ISpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";
import { getRepository, Repository } from "typeorm";

export class SpecificationRepositoryImpl implements ISpecificationRepository {

    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification);
    }

    async create({ name, description }: ISpecificationDTO): Promise<void> {
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        return await this.repository.find();
    }

    async findByName(name: string): Promise<Specification | undefined> {
        return await this.repository.findOne({ name });
    }
}
