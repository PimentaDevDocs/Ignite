import { Router } from "express";
import { categoryRoutes } from "./Category.routes";
import { specificationRoutes } from "./Specification.routes";


const router = Router();

router.use('/categories', categoryRoutes);
router.use('/specifications', specificationRoutes);

export { router };
