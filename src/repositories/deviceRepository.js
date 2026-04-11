import Device from "../models/Device.js";

export const create = (data) => Device.create(data);

export const findAll = () => Device.find();

export const findById = (id) => Device.findById(id);

export const update = (id, data) =>
  Device.findByIdAndUpdate(id, data, {
    returnDocument: "after"
  });

export const remove = (id) => Device.findByIdAndDelete(id);

export const findByName = (name) => Device.findOne({ name });

export const updateByName = (name, data) =>
  Device.findOneAndUpdate({ name }, data, {
    returnDocument: "after"
  });