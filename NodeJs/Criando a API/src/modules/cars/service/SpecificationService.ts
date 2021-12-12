import { ISpecificationRepository } from "../repository/ISpecificationRepository";
import 'reflect-metadata';
import { Specification } from "../entity/Specification";
import { inject, injectable } from "tsyringe";
import * as fs from "fs";
import { parse as csvParse } from "csv-parse";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
export class SpecificationService {

    constructor(
        @inject("SpecificationRepositoryImpl")
        private specificationRepository: ISpecificationRepository) {
    }

    async create({ name, description }: IRequest): Promise<void> {

        const specificationAlreadyExists = await this.specificationRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists');
        }

        await this.specificationRepository.create({ name, description });
    }

    async list(): Promise<Specification[]> {
        return this.specificationRepository.list();
    }

    readFile(file: Express.Multer.File | undefined): Promise<Specification[]> {
        return new Promise((resolve, reject) => {

            if (!file) {
                throw new Error('File not found');
            }

            const stream = fs.createReadStream(file.path);
            const specification: Specification[] = [];

            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    specification.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    fs.promises.unlink(file.path);

                    specification.map(async cat => {

                        if (!await this.specificationRepository.findByName(cat.name))
                            this.create({
                                name: cat.name,
                                description: cat.description
                            });
                    })

                    resolve(specification);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

}
