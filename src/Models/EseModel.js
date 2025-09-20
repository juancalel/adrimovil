import { connection } from "../Config/index.js";

export class EseModel {
    static async getEseFormById({ id }) {
        return connection.query('SELECT * FROM informacion_registro_ese WHERE id_formulario = $1', [id])
            .then(result => {
                return (result.length === 0)
                    ? { success: false, message: 'Formulario ESE no encontrado' }
                    : { success: true, data: result }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })
    }

    static async createEseForm({ id, data }) {
        const { area_accion, saneamiento_proyecto, sefic_capital = '', sefic_grupo_solidario = '', sefic_credito_individual = '', paa_categoria_produccion = '', paa_modalidad_beneficiario = '', paa_tipo_beneficiario = '', secureUrl = '', publicId = '', tecnico_id = '' } = data;

        return connection.one('INSERT INTO informacion_registro_ese ( area_accion, saneamiento_proyecto, sefic_capital, sefic_grupo_solidario, sefic_credito_individual, paa_categoria_produccion, paa_modalidad_beneficiario, paa_tipo_beneficiario, secureUrl, publicId, tecnico_id, id_formulario) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id_info_registro', [area_accion, saneamiento_proyecto, sefic_capital, sefic_grupo_solidario, sefic_credito_individual, paa_categoria_produccion, paa_modalidad_beneficiario, paa_tipo_beneficiario, secureUrl, publicId, tecnico_id, parseInt(id)])
            .then(result => {
                if (result.id_info_registro === 0) {
                    return { success: false, message: 'Error al crear el formulario ESE' }
                }
                return { success: true, id: result.id_info_registro }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })
    }

    static async createEseBeneficiary({ id, data }) {
        const { nombres, dpi, edad, telefono, sexo, beneficiado_antes, proyecto, municipio, departamento, comunidad, latitude, longitud, altitud, leer_escribir, escolaridad, etnia, estado_civil, tiene_hijos, cuantos_hijos, tiene_discapacidad, tipo_discapacidad } = data;

        return connection.one('INSERT INTO informacion_beneficiario (nombres, dpi, edad, telefono, sexo, beneficiado_antes, proyecto, municipio, departamento, comunidad, latitude, longitud, altitud, leer_escribir, escolaridad, etnia, estado_civil, tiene_hijos, cuantos_hijos, tiene_discapacidad, tipo_discapacidad, id_info_registro) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING id', [nombres, dpi, edad, telefono, sexo, beneficiado_antes, proyecto, municipio, departamento, comunidad, latitude, longitud, altitud, leer_escribir, escolaridad, etnia, estado_civil, tiene_hijos, cuantos_hijos, tiene_discapacidad, tipo_discapacidad, parseInt(id)])
            .then(result => {
                if (result.id_beneficiario === 0) {
                    return { success: false, message: 'Error al crear el beneficiario' }
                }
                return { success: true, id: result.id }
            })
            .catch(error => {
                console.error('Error executing query: ', error)
                return { success: false, message: 'Error executing query' }
            })
    }

}