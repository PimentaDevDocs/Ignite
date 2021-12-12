import { container } from 'tsyringe';
import { ICategoryRepository } from "../../modules/cars/repository/ICategoryRepository";
import { CategoryRepositoryImpl } from "../../modules/cars/repository/impl/CategoryRepositoryImpl";
import { ISpecificationRepository } from "../../modules/cars/repository/ISpecificationRepository";
import { SpecificationRepositoryImpl } from "../../modules/cars/repository/impl/SpecificationRepositoryImpl";

container.registerSingleton<ICategoryRepository>(
    'CategoryRepositoryImpl',
    CategoryRepositoryImpl
);

container.registerSingleton<ISpecificationRepository>(
    'SpecificationRepositoryImpl',
    SpecificationRepositoryImpl
);
