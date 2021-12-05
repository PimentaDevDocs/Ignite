import { Category } from "../../model/Category";
import { ICategoriyRepository, ICategoryDTO } from "../ICategoriyRepository";

export class CategoryRepositoryImpl implements ICategoriyRepository {

    private categories: Category[];

    private static instance: CategoryRepositoryImpl;

    private constructor() {
        this.categories = [];
    }

    public static getInstance(): CategoryRepositoryImpl {
        if (!CategoryRepositoryImpl.instance) {
            CategoryRepositoryImpl.instance = new CategoryRepositoryImpl();
        }
        return CategoryRepositoryImpl.instance;
    }

    create({ name, description }: ICategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            createdAt: new Date()
        });

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category | undefined {

        return this.categories.find(category => category.name === name);
    }
}
