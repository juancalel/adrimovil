import { connection } from "../Config/index.js";

export class FormModel {

    static async getFormById({ id }) {
        return connection.query('SELECT * FROM formularios WHERE id_formulario = $1', [id])
            .then(result => {
                return (result.length === 0)
                    ? { success: false, message: 'Formulario no encontrado' }
                    : { success: true, data: result }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })

    }
    static async getAllForms() {
        return connection.any('SELECT * FROM formularios')
            .then(data => {
                return (data.length === 0)
                    ? { success: false, message: 'No hay formularios disponibles' }
                    : { success: true, data: data }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })
    }
    static async createForm({ input }) {
        const { nombre, descripcion = '', creado_por } = input;
        return connection.one('INSERT INTO formularios (nombre, descripcion, creado_por)  VALUES ($1, $2, $3) RETURNING id_formulario', [nombre, descripcion, creado_por])
            .then(result => {
                return { success: true, data: result }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })
    }
    static async updateForm({ id, input }) {
        const queryParts = [];
        const queryParams = [];
        let index = 0;

        if (input.nombre) {
            index += 1;
            queryParts.push(`nombre = $${index}`);
            queryParams.push(input.nombre);
        }
        if (input.descripcion) {
            index += 1;
            queryParts.push(`descripcion = $${index}`);
            queryParams.push(input.descripcion);
        }

        if (queryParts.length === 0) {
            return { success: false, message: 'No fields to update' };
        }

        queryParams.push(id);
        const query = `UPDATE formularios SET ${queryParts.join(', ')} WHERE id_formulario = $${queryParams.length}`;

        return connection.result(query, queryParams)
            .then(result => {
                return (result.rowCount === 1)
                    ? { success: true, message: 'Formulario actualizado correctamente' }
                    : { success: false, message: 'Formulario no encontrado' };
            })
            .catch(error => {
                console.error('Error executing query: ', error);
                return { success: false, message: 'Error executing query' };
            });
    }
    static async deleteForm({ id }) {
        // Lógica para eliminar el formulario con el ID proporcionado
        return connection.result('DELETE FROM formularios WHERE id_formulario = $1', [id])
            .then(result => {
                return (result.rowCount === 1)
                    ? { success: true, message: 'Formulario eliminado correctamente' }
                    : { success: false, message: 'Formulario no encontrado' };
            })
            .catch(error => {
                console.error('Error executing query: ', error);
                return { success: false, message: 'Error executing query' };
            });
    }
}