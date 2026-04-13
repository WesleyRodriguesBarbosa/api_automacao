import Device from "../models/Device.js";

class deviceRepository {

  async create(data) {
    return await Device.create(data);
  }

  async getAll() {
    return await Device.find();
  }

  async getById(id) {
    return await Device.findById(id);
  }

  async update(id, data) {
    return await Device.findByIdAndUpdate(id, data, {
      returnDocument: "after"
    });
  }

  async delete(id) {
    return await Device.findByIdAndDelete(id);
  }

  async updateByName(name, data) {
    return await Device.findOneAndUpdate({ name }, data, {
      returnDocument: "after"
    });
  }
}

export default new deviceRepository();