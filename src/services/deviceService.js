import * as repo from "../repositories/deviceRepository.js";

const VALID_PINS = [23, 22, 19, 18];

export const createDevice = async (data) => {
  if (!VALID_PINS.includes(data.pin)) {
    throw new Error("GPIO inválido!");
  }

  return await repo.create(data);
};

export const getDevices = async () => {
  return await repo.findAll();
};

export const getDeviceById = async (id) => {
  return await repo.findById(id);
};

export const updateDevice = async (id, data) => {
  if (data.pin && !VALID_PINS.includes(data.pin)) {
    throw new Error("GPIO inválido!");
  }

  return await repo.update(id, data);
};

export const updateDeviceByName = async (name, data) => {

  const device = await repo.findByName(name);

  if (!device) {
    throw new Error("Dispositivo não encontrado");
  }

  // 🚫 impedir trocar nome para um já existente
  if (data.name && data.name !== name) {
    const existe = await repo.findByName(data.name);
    if (existe) {
      throw new Error("Nome já está em uso!");
    }
  }

  return await repo.updateByName(name, data);
};

export const deleteDevice = async (id) => {
  const device = await repo.findById(id);

  if (!device) {
    throw new Error("Dispositivo não encontrado");
  }

  if (device.status === true) {
    throw new Error("GPIO ativo, desative para excluir dispositivo!");
  }

  return await repo.remove(id);
};