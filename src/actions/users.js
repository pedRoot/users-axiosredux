import { 
  CREATE_USER,
  RETRIEVE_USERS,
  UPDATE_USER,
  DELETE_USER,
  DELETE_ALL_USERS
 } from "./types";

 import UserDataService from "../services/User";

 export const create = (title, description) => async (dispatch) => {
  try {
    const res = await UserDataService.create({title, description});

    dispatch({
      type: CREATE_USER,
      payload: res.data
    });

    return Promise.resolve(res.data);

  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAll = () => async (dispatch) => {
  try {
    const res = await UserDataService.getAll();

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data.data
    });

  } catch (error) {
    console.log(error);
  }
};

export const update = (id, data) => async (dispatch) => {
  try {
    const res = await UserDataService.update(id, data);

    dispatch({
      type: UPDATE_USER,
      payload: data
    });

    return Promise.resolve(res.data);

  } catch (error) {
    return Promise.reject(error);
  }
};

export const remove = (id) => async (dispatch) => {
  try {
    await UserDataService.remove(id);

    dispatch({
      type: DELETE_USER,
      payload: { id },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAll = () => async (dispatch) => {
  try {
    const res = await UserDataService.removeAll();

    dispatch({
      type: DELETE_ALL_USERS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const findByName = (title) => async (dispatch) => {
  try {
    const res = await UserDataService.findByTitle(title);

    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};