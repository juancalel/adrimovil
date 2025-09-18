import { EseModel } from "../Models/EseModel.js";

export class EseController {
    // Implementa los métodos del controlador para manejar las solicitudes relacionadas con ESE
    static async getAllEseForm(req, res) {

        try {
            const { id } = req.params;
            const EseData = await EseModel.getEseFormById({ id });
            if (!EseData.success) {
                return res.status(404).json({ message: EseData.message });
            }
            return res.json(EseData.data);
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async createEseRegister(req, res) {
        const { id } = req.params;
        const formData = req.body;

        try {
            const result = await EseModel.createEseForm({ id, data: formData });
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(201).json({ id: result.id });
        } catch (error) {
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async createEseBeneficiary(req, res) {

    }
    static async createEseEconomic(req, res) {
        return res.status(501).json({ message: "Not implemented" });
    }
    static async createEseDwelling(req, res) {
        return res.status(501).json({ message: "Not implemented" });
    }
    static async createEseServices(req, res) {
        return res.status(501).json({ message: "Not implemented" });
    }
}