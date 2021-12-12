import { Category } from "../entity/Category";

export interface ICategoryDTO {
    name: string;
    description: string;
}

export interface ICategoryRepository {

    findByName(name: string): Promise<Category | undefined>;

    list(): Promise<Category[]>;

    create({ name, description }: ICategoryDTO): Promise<void>;

}
