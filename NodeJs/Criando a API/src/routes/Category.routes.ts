import { Router } from 'express';
// @ts-ignore
import { Category } from '../modules/cars/entity/Category';
import multer from "multer";
import { CategoryController } from "../modules/cars/controller/CategoryController";

const categoryRoutes = Router();

const categoryController = new CategoryController();

const upload = multer({
    dest: './temp'
});

categoryRoutes.get('/', categoryController.list)

categoryRoutes.post('/', categoryController.create);

categoryRoutes.post('/import', upload.single('file'), categoryController.import)

export { categoryRoutes };
