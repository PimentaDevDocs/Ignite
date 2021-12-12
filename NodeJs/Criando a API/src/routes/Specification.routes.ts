import { Router } from 'express';
// @ts-ignore
import { Specification } from '../modules/cars/entity/Specification';
import multer from "multer";
import { SpecificationController } from "../modules/cars/controller/SpecificationController";

const specificationRoutes = Router();

const specificationController = new SpecificationController();

const upload = multer({
    dest: './temp'
});

specificationRoutes.get('/', specificationController.list)

specificationRoutes.post('/', specificationController.create);

specificationRoutes.post('/import', upload.single('file'), specificationController.import)

export { specificationRoutes };
