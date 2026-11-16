import { randomUUID } from 'node:crypto';

const users = [];

export function createUser(data) {
    const { keycloakId, name, email, registrationNumber } = data;

    const emailAlreadyExists = users.some(
        user => user.email === email
    );

    if (emailAlreadyExists) {
        throw new Error('Este e-mail já está cadastrado.');
    }

    const registrationAlreadyExists = users.some(
        user => user.registrationNumber === registrationNumber
    );

    if (registrationAlreadyExists) {
        throw new Error('Esta matrícula já está cadastrada.');
    }

    const user = {
        id: randomUUID(),
        keycloakId,
        name,
        email,
        registrationNumber,
        active: true,
        createdAt: new Date().toISOString()
    };

    users.push(user);

    return user;
}

export function getAllUsers() {
    return users;
}

export function getUserById(id) {
    return users.find(user => user.id === id);
}

export function updateUser(id, data) {
    const user = getUserById(id);

    if (!user) {
        return null;
    }

    const { name, email, registrationNumber, active } = data;

    if (email !== undefined) {
        const emailExists = users.some(
            item => item.email === email && item.id !== id
        );

        if (emailExists) {
            throw new Error('Este e-mail já está cadastrado.');
        }

        user.email = email;
    }

    if (registrationNumber !== undefined) {
        const registrationExists = users.some(
            item => item.registrationNumber === registrationNumber
                && item.id !== id
        );

        if (registrationExists) {
            throw new Error('Esta matrícula já está cadastrada.');
        }

        user.registrationNumber = registrationNumber;
    }

    if (name !== undefined) user.name = name;
    if (active !== undefined) user.active = active;

    return user;
}

export function deleteUser(id) {
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return false;
    }

    users.splice(index, 1);

    return true;
}
