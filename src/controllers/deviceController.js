import * as service from "../services/deviceService.js";

export const create = async (req, res) => {
    try {
        const device = await service.createDevice(req.body); //Chama o service para criar um novo dispositivo
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

export const findAll = async (req, res) => {
    try {
        const devices = await service.getDevices();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const findById = async (req, res) => {
    try {
        const device = await service.getDeviceById(req.params.id);
        if (!device) {
            return res.status(404).json({ error: "Dispositivo não encontrado" });
        }
        res.json(device);
    } catch (error) {
        res.status(400).json({ error: "ID inválido" });
    }
};

export const update = async (req, res) => {
    try {
        const device = await service.updateDevice(req.params.id, req.body);
        if (!device) {
            return res.status(404).json({ error: "Dispositivo não encontrado" });
        }
        res.json(device);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateByName = async (req, res) => {
    try {
        const device = await service.updateDeviceByName(req.params.name, req.body);
        res.json(device);
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ error: "Nome já está em uso!" });
        }
        res.status(400).json({ error: error.message });
    }
};

export const remove = async (req, res) => {
    try {
        await service.deleteDevice(req.params.id);
        res.json({ message: "Deletado com sucesso" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};