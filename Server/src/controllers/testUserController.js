import { createTestUserService, deleteTestUserService, getAllTestUsersService, getTestUserByIdService, updateTestUserService } from "../models/testUser.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const createTestUser = async (req, res, next) => {
  const { name, email, role, department } = req.body;
  try {
    const newUser = await createTestUserService(name, email, role, department);
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    next(err);
  }
};

export const getAllTestUsers = async (req, res, next) => {
  try {
    const users = await getAllTestUsersService();
    handleResponse(res, 200, "Users fetched successfully", users);
  } catch (err) {
    next(err);
  }
};

export const getTestUserById = async (req, res, next) => {
  try {
    const user = await getTestUserByIdService(req.params.id);
    if (!user) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User fetched successfully", user);
  } catch (err) {
    next(err);
  }
};

export const updateTestUser = async (req, res, next) => {
  const { name, email, role, department } = req.body;
  try {
    const updatedUser = await updateTestUserService(req.params.id, name, email, role, department);
    if (!updatedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User updated successfully", updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteTestUser = async (req, res, next) => {
  try {
    const deletedUser = await deleteTestUserService(req.params.id);
    if (!deletedUser) return handleResponse(res, 404, "User not found");
    handleResponse(res, 200, "User deleted successfully", deletedUser);
  } catch (err) {
    next(err);
  }
};