import express from 'express';
import usersRoutes from './routes/users.routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'Users Service',
        status: 'UP',
        message: 'Serviço funcionando corretamente!'
    });
});

app.use('/users', usersRoutes);

app.use((req, res) => {
    res.status(404).json({
        error: 'Rota não encontrada.'
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Users Service executando na porta ${PORT}`);
});
