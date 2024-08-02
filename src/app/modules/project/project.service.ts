import { TProjectInput, TProjectOutput } from "./project.interface";
import Project from "./project.model";

const create = async (payload: TProjectInput): Promise<TProjectOutput> => {
  const result = await Project.create(payload);
  return result.dataValues;
};

const getAll = async (): Promise<TProjectOutput[]> => {
  const result = await Project.findAll();
  return result;
};

export const ProjectService = {
  create,
  getAll,
};
