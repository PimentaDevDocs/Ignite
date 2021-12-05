import express from 'express';
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger.json')));

app.use(router)

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
