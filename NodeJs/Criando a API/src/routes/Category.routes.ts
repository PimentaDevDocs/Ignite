import { Router } from 'express';
// @ts-ignore
import { Category } from '../modules/cars/model/Category';
import { categoryController } from "../modules/cars/controller";
import multer from "multer";

const categoryRoutes = Router();

const upload = multer({
    dest: './temp'
});

categoryRoutes.get('/', (request, response) => {

    return categoryController.list(request, response)
})

categoryRoutes.post('/', (request, response) => {

    return categoryController.create(request, response);

})

categoryRoutes.post('/import', upload.single('file'), (request, response) => {

    return categoryController.import(request, response);

})

export { categoryRoutes };
