import deviceService from "../services/deviceService.js";

class DeviceController {
    async create (req, res) {
        try {
            const device = await deviceService.create(req.body);
            res.status(201).json(device);
        } catch (error) {
            res.status(400).json({ error: error.message
            });
        }
    };

    async getAll (req, res) {
        try {
            const devices = await deviceService.getAll();
            res.json(devices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getById (req, res) {
        try {
            const device = await deviceService.getById(req.params.id);
            if (!device) {
                return res.status(404).json({ error: "Dispositivo não encontrado" });
            }
            res.json(device);
        } catch (error) {
            res.status(400).json({ error: "ID inválido" });
        }
    };

    async update (req, res) {
        try {
            const device = await deviceService.update(req.params.id, req.body);
            if (!device) {
                return res.status(404).json({ error: "Dispositivo não encontrado" });
            }
            res.json(device);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    async delete (req, res) {
        try {
            await deviceService.delete(req.params.id);
            res.json({ message: "Deletado com sucesso" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}
export default new DeviceController();