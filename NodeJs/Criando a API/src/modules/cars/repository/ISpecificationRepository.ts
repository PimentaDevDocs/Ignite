import { Specification } from "../entity/Specification";

export interface ISpecificationDTO {
    name: string;
    description: string;
}

export interface ISpecificationRepository {

    findByName(name: string): Promise<Specification | undefined>;

    list(): Promise<Specification[]>;

    create({ name, description }: ISpecificationDTO): Promise<void>;

}
