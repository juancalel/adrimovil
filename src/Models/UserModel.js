import bcrypt from 'bcrypt'
import { connection } from '../Config/index.js'


export class UserModel {
    static async getAll() {
        return connection.query('SELECT * FROM usuarios')
            .then(result => {
                // `data` es un arreglo de objetos que contiene los resultados de la consulta
                return { success: true, data: result }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })
    }

    static async getById({ id }) {
        return connection.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id])
            .then(result => {
                return (result.length === 0)
                    ? { success: false, message: 'User not found' }
                    : { success: true, data: result[0] }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })
    }

    static async create({ input }) {
        const {
            nombres,
            apellidos,
            email,
            password,
            tipo_usuario
        } = input

        const hashedPassword = await bcrypt.hash(password, 10) // 10 es el número de rondas de hashing
        return connection.one('INSERT INTO usuarios (nombres, apellidos, email, password, tipo_usuario) VALUES($1, $2, $3, $4, $5) RETURNING id_usuario', [nombres, apellidos, email, hashedPassword, tipo_usuario])
            .then(insertedUser => {
                // `data` contiene el ID del nuevo usuario insertado
                return connection.any('SELECT * FROM usuarios WHERE id_usuario = $1', [insertedUser.id_usuario])
            })
            .then(userData => {
                // `data` contiene los resultados de la consulta
                return (userData.length === 0)
                    ? { success: false, message: 'the user could not register' }
                    : { success: true, data: userData[0] }
            })
            .catch(error => {
                console.error('error when registering user: ', error)
                return { success: false, message: 'error when registering user:' }
            })
    }

    static async update({ id, input }) {
        // Construye la consulta SQL dinámicamente
        const queryParts = []
        const queryParams = []

        // Verifica y agrega campos a la consulta según lo que se proporciona en updatedUserData
        let index = 0
        if (input.nombres) {
            index += 1
            queryParts.push(`nombres = $${index}`)
            queryParams.push(input.nombres)
        }
        if (input.apellidos) {
            index += 1
            queryParts.push(`apellidos = $${index}`)
            queryParams.push(input.apellidos)
        }
        if (input.email) {
            index += 1
            queryParts.push(`email = $${index}`)
            queryParams.push(input.email)
        }
        if (input.tipo_usuario) {
            index += 1
            queryParts.push(`tipo_usuario = $${index}`)
            queryParams.push(input.tipo_usuario)
        }
        // Comprueba si hay campos para actualizar
        if (queryParts.length === 0) {
            return { success: false, message: 'No fields provided to update' }
        }
        queryParams.push(id)

        const updateQuery = `UPDATE usuarios SET ${queryParts.join(', ')} WHERE id_usuario = $${queryParams.length}`

        // Realiza la actualización en la base de datos
        return connection.result(updateQuery, queryParams)
            .then(result => {
                return (result.rowCount === 1)
                    ? { success: true, message: 'Successfully updated user' }
                    : { success: false, message: 'User not found' }
            })
            .catch(error => {
                console.error('Error updating user', error)
                return { success: false, message: 'Error updating user' }
            })
    }

    static async delete({ id }) {
        // Ejecuta la consulta SQL para eliminar el usuario
        return connection.result('DELETE FROM usuarios WHERE id_usuario = $1', [id])
            .then(result => {
                // Verifica si se eliminó el usuario correctamente
                return (result.rowCount === 1)
                    ? { success: true, message: 'User deleted successfully' }
                    : { success: false, message: 'User not found' }
            })
            .catch(error => {
                console.error('Error remove user:', error)
                return { success: false, message: 'Error remove user' }
            })
    }

    static async userExists({ email }) {
        return connection.any('SELECT * FROM usuarios WHERE email = $1', [email])
            .then(data => {
                // `data` contiene los resultados de la consulta
                return (data.length === 0) ? null : data[0]
            })
            .catch(error => {
                console.error('Error executing query:', error)
            })
    }

    static async validateUser({ email, password }) {
        return connection.query('SELECT * FROM usuarios WHERE email = $1', [email])
            .then(data => {
                if (data.length === 1) {
                    return bcrypt.compare(password, data[0].password)
                        .then(isMatch => {
                            return isMatch ? data[0] : null
                        })
                } else {
                    return null
                }
            })
            .catch(error => {
                console.error('Error find user:', error)
            })
    }

    static async changePassword({ id, password, newpassword }) {
        return await connection.query('SELECT * FROM usuarios WHERE id_usuario = $1', [id])
            .then(data => {
                if (data.length === 1) {
                    return bcrypt.compare(password, data[0].password)
                }
            })
            .then(isMatch => {
                if (isMatch) {
                    return bcrypt.hash(newpassword, 10) // 10 es el número de rondas de hashing
                }
            })
            .then(hashedPassword => {
                const updatedUser = connection.oneOrNone('UPDATE usuarios SET password = $1 WHERE id_usuario = $2 RETURNING *', [hashedPassword, id])
                return (!updatedUser) ? null : updatedUser
            })
            .catch(error => {
                console.error('Error executing query:', error)
            })
    }
}
