import { ICategoryRepository } from "../repository/ICategoryRepository";
import 'reflect-metadata';
import { Category } from "../entity/Category";
import { inject, injectable } from "tsyringe";
import * as fs from "fs";
import { parse as csvParse } from "csv-parse";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class CategoryService {

    constructor(
        @inject("CategoryRepositoryImpl")
        private categoriesRepository: ICategoryRepository) {
    }

    async create({ name, description }: IRequest): Promise<void> {

        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error('Category already exists');
        }

        await this.categoriesRepository.create({ name, description });
    }

    async list(): Promise<Category[]> {
        return await this.categoriesRepository.list();
    }

    readFile(file: Express.Multer.File | undefined): Promise<Category[]> {
        return new Promise((resolve, reject) => {

            if (!file) {
                throw new Error('File not found');
            }

            const stream = fs.createReadStream(file.path);
            const categories: Category[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);

                    categories.map(async cat => {

                        if (!await this.categoriesRepository.findByName(cat.name))
                            this.create({
                                name: cat.name,
                                description: cat.description
                            });
                    })

                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

}
