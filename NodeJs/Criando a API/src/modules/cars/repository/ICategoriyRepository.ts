import { Category } from "../model/Category";

export interface ICategoryDTO {
    name: string;
    description: string;
}

interface IImportCatergory {
    name: string;
    description: string;
}

export interface ICategoriyRepository {

    findByName(name: string): Category | undefined;

    list(): Category[];

    create({ name, description }: ICategoryDTO): void;

}
