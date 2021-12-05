import { Router } from 'express';
// @ts-ignore
import { Specification } from "../modules/cars/model/Specification";
import { SpecificationRepositoryImpl } from "../modules/cars/repository/impl/SpecificationRepositoryImpl";
import { SpecificationService } from "../modules/cars/service/SpecificationService";

const specificationRoutes = Router();

const specifications: Specification[] = [];

const specificationRepository = new SpecificationRepositoryImpl();

specificationRoutes.get('/', (request, response) => {

    return response.status(200).send(specificationRepository.list());
})

specificationRoutes.post('/', (request, response) => {
    const { name, description } = request.body;

    const specificationService = new SpecificationService(specificationRepository);

    specificationService.create({ name, description });

    return response.status(200).send();
})

export { specificationRoutes };
