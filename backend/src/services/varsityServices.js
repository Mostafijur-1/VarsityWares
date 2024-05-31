const slugify = require("slugify");
const { Varsity } = require("../models/varsityModel");

const createVarsity = async (name) => {
  const newVarsity = await Varsity.create({
    name: name,
    slug: slugify(name),
  });

  return newVarsity;
};

const getVarsities = async () => {
  return await Varsity.find({}).select("name slug").lean();
};

const getVarsity = async (slug) => {
  return await Varsity.find({ slug }).select("name slug").lean();
};

const updateVarsity = async (slug, name) => {
  const filter = { slug };
  const updates = { $set: { name, slug: slugify(name) } };
  const options = { new: true };
  return await Varsity.findOneAndUpdate(filter, updates, options);
};

const deleteVarsity = async (slug) => {
  return await Varsity.findOneAndDelete({ slug });
};

module.exports = {
  createVarsity,
  getVarsities,
  getVarsity,
  updateVarsity,
  deleteVarsity,
};
