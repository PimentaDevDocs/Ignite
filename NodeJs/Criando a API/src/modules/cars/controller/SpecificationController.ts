import { Request, Response } from "express";
import { SpecificationService } from "../service/SpecificationService";
import { container } from "tsyringe";

export class SpecificationController {

    async create(req: Request, res: Response): Promise<Response> {

        const { name, description } = req.body;
        const specificationService = container.resolve(SpecificationService);
        try {
            await specificationService.create({ name, description });
            return res.status(201).send();
        } catch (error) {
            // @ts-ignore
            return res.status(400).json({ error: error.message }).send();
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        const specificationService = container.resolve(SpecificationService);
        return res.json(await specificationService.list());
    }

    async import(req: Request, res: Response): Promise<Response> {

        const { file } = req;

        const specificationService = container.resolve(SpecificationService);

        await specificationService.readFile(file)

        return res.status(201).send();
    }
}
