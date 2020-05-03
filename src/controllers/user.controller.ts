import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

/**
 * 获取全部users
 * @param req
 * @param res
 */
export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const users = await getRepository(User).find();
  return res.json(users);
};

/**
 * 获取单个user BY ID
 * @param req
 * @param res
 */
export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const users = await getRepository(User).findOne(id);
  return res.json(users);
};

/**
 * 创建user
 * @param req
 * @param res
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newUser = await getRepository(User).create({ ...req.body } as Object);
  const results = await getRepository(User).save(newUser);
  return res.json(results);
};

/**
 * 更新user By ID
 * @param req
 * @param res
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response | Error> => {
  try {
    const { id } = req.params;
    // const { firstName, lastName } = req.body;
    const user = await getRepository(User).findOne({ where: { id } });
    if (user) {
      // results.firstName = firstName;
      // results.lastName = lastName;
      // await getRepository(User).save({ ...results });
      await getRepository(User).merge(user, req.body);
      const result = await getRepository(User).save(user);

      return res.json(result);
    } else {
      return res.status(404).json({ message: 'Not User Found' });
    }
  } catch (err) {
    return res.status(400).json({ message: 'error' });
  }
};

/**
 * 删除user
 * @param req
 * @param res
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const results = await getRepository(User).delete(req.params.id);
  return res.json({ message: 'success' });
};
