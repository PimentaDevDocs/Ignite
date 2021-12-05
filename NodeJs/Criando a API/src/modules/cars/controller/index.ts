import { CategoryRepositoryImpl } from "../repository/impl/CategoryRepositoryImpl";
import { CategoriyService } from "../service/CategoriyService";
import { CategoryController } from "./CategoryController";

const categoryRepository = CategoryRepositoryImpl.getInstance();
const categoryService = new CategoriyService(categoryRepository);
const categoryController = new CategoryController(categoryService);

export { categoryController }
