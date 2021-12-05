import express from 'express';
import { categoryRoutes } from "./routes/Category.routes";
import { specificationRoutes } from "./routes/Specification.routes";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router)

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
