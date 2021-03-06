import { Request, Response } from "express";
import { CategoryService } from "../service/CategoryService";
import { container } from "tsyringe";

export class CategoryController {

    async create(req: Request, res: Response): Promise<Response> {

        const { name, description } = req.body;
        const categoryService = container.resolve(CategoryService);
        try {
            await categoryService.create({ name, description });
            return res.status(201).send();
        } catch (error) {
            // @ts-ignore
            return res.status(400).json({ error: error.message }).send();
        }
    }

    async list(req: Request, res: Response): Promise<Response> {
        const categoryService = container.resolve(CategoryService);
        return res.json(await categoryService.list());
    }

    async import(req: Request, res: Response): Promise<Response> {

        const { file } = req;

        const categoryService = container.resolve(CategoryService);

        await categoryService.readFile(file)

        return res.status(201).send();
    }
}
