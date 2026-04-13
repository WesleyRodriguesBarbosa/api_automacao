import deviceRepository from "../repositories/deviceRepository.js";
const VALID_PINS = [23, 22, 19, 18];
class DeviceService {

  async create(data) {
    if (!VALID_PINS.includes(data.pin)) {
      throw new Error("GPIO inválido!");
    }
    return await deviceRepository.create(data);
  };

  async getAll() {
    return await deviceRepository.getAll();
  };

  async getById(id) {
    return await deviceRepository.getById(id);
  };

  async update(id, data) {
    if (data.pin && !VALID_PINS.includes(data.pin)) {
      throw new Error("GPIO inválido!");
    }

    return await deviceRepository.update(id, data);
  };

  async delete(id) {
    const device = await deviceRepository.getById(id);

    if (!device) {
      throw new Error("Dispositivo não encontrado");
    }

    if (device.status === true) {
      throw new Error("GPIO ativo, desative para excluir dispositivo!");
    }

    return await deviceRepository.delete(id);
  };
}
export default new DeviceService();