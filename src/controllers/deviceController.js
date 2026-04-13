import deviceService from "../services/deviceService.js";

class DeviceController {
    async create (req, res) {
        try {
            const device = await service.create(req.body); //Chama o service para criar um novo dispositivo
            res.status(201).json(device);  //Se deu tudo certo, retorna o dispositivo criado
        } catch (error) { //Tratamento de erro
            if (error.code === 11000) { //Código 11000 = violação de índice único (unique) no MongoDB
                const campo = Object.keys(error.keyValue)[0]; //Descobre qual campo causou o erro (pin ou name)

                if (campo === "pin") { //Se foi o pin
                    return res.status(400).json({
                        error: "GPIO já está em uso!"
                    });
                }

                if (campo === "name") { //Se foi o name
                    return res.status(400).json({
                        error: "Nome já está em uso!"
                    });
                }

                return res.status(400).json({ //Caso seja outro
                    error: "Valor duplicado!"
                });
            }
            res.status(400).json({ //Case seja qualquer outro tipo de erro
                error: error.message
            });
        }
    };

    async getAll (req, res) {
        try {
            const devices = await service.get();
            res.json(devices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getById (req, res) {
        try {
            const device = await service.getById(req.params.id);
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
            const device = await service.update(req.params.id, req.body);
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
            await service.delete(req.params.id);
            res.json({ message: "Deletado com sucesso" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}
export default new DeviceController();