import { Category } from "../model/Category";

export interface ISpecificationDTO {
    name: string;
    description: string;
}

export interface ISpecificationRepository {

    findByName(name: string): Category | undefined;

    list(): Category[];

    create({ name, description }: ISpecificationDTO): void;

}
