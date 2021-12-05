import { Request, Response } from "express";
import { CategoriyService } from "../service/CategoriyService";

export class CategoryController {

    constructor(private categoryService: CategoriyService) {
    }

    create(req: Request, res: Response): Response {

        const { name, description } = req.body;

        try {
            this.categoryService.create({ name, description });
            return res.status(201).send();
        } catch (error) {
            // @ts-ignore
            return res.status(400).json({ error: error.message }).send();
        }
    }

    list(req: Request, res: Response): Response {
        return res.json(this.categoryService.list());
    }

    import(req: Request, res: Response): Response {

        const { file } = req;

        this.categoryService.readFile(file)

        return res.status(201).send();
    }
}
