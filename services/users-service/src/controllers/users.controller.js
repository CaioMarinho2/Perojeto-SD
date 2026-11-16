import * as UsersService from '../services/users.service.js';

export function createUser(req, res) {
    try {
        const { keycloakId, name, email, registrationNumber } = req.body;

        if (!keycloakId || !name || !email || !registrationNumber) {
            return res.status(400).json({
                error: 'Informe keycloakId, name, email e registrationNumber.'
            });
        }

        const user = UsersService.createUser({
            keycloakId,
            name,
            email,
            registrationNumber
        });

        return res.status(201).json(user);

    } catch (error) {
        return res.status(409).json({
            error: error.message
        });
    }
}

export function getAllUsers(req, res) {
    return res.status(200).json(
        UsersService.getAllUsers()
    );
}

export function getUserById(req, res) {
    const user = UsersService.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({
            error: 'Usuário não encontrado.'
        });
    }

    return res.status(200).json(user);
}

export function updateUser(req, res) {
    try {
        const user = UsersService.updateUser(
            req.params.id,
            req.body
        );

        if (!user) {
            return res.status(404).json({
                error: 'Usuário não encontrado.'
            });
        }

        return res.status(200).json(user);

    } catch (error) {
        return res.status(409).json({
            error: error.message
        });
    }
}

export function deleteUser(req, res) {
    const deleted = UsersService.deleteUser(req.params.id);

    if (!deleted) {
        return res.status(404).json({
            error: 'Usuário não encontrado.'
        });
    }

    return res.status(204).send();
}
