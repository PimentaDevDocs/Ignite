import { ICategoriyRepository } from "../repository/ICategoriyRepository";
import { Category } from "../model/Category";
import * as fs from "fs";
import { parse as csvParse } from "csv-parse";

interface IRequest {
    name: string;
    description: string;
}

export class CategoriyService {

    constructor(private categoriesRepository: ICategoriyRepository) {
    }

    create({ name, description }: IRequest): void {

        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error('Category already exists');
        }

        this.categoriesRepository.create({ name, description });
    }

    list(): Category[] {
        return this.categoriesRepository.list();
    }

    readFile(file: Express.Multer.File | undefined): void {

        if (!file) {
            throw new Error('File not found');
        }

        const stream = fs.createReadStream(file.path);

        const parseFile = csvParse();

        stream.pipe(parseFile);

        parseFile.on('data', async (line) => {

            console.log(line);
        });

    }
}
