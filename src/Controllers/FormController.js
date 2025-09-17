import { FormModel } from "../Models/FormModel.js";

export class FormController {

    static async getFormById(req, res) {
        try {
            const { id } = req.params;
            // Lógica para obtener el formulario por ID
            const result = await FormModel.getFormById({ id });
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            return res.json(result.data)
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener el formulario', error });
        }
    }
    static async getAllForms(req, res) {
        // Lógica para obtener todos los formularios
        try {
            const result = await FormModel.getAllForms();
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
            return res.json(result.data)
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener los formularios', error });
        }
    }
    static async createForm(req, res) {
        const data = req.body;
        try {
            const result = await FormModel.createForm({ input: data });
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(201).json({ message: "Formulario creado", data: result.data });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear el formulario', error });
        }
    }
    static async updateForm(req, res) {
        const { id } = req.params;
        try {
            const result = await FormModel.updateForm({ id, input: req.body });
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.json({ message: `Formulario ${id} actualizado`, data: result.data });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar el formulario', error });
        }
    }
    static async deleteForm(req, res) {
        const { id } = req.params;
        try {
            const result = await FormModel.deleteForm(id);
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar el formulario', error });
        }
    }
}

