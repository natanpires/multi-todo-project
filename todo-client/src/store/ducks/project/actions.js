import * as types from './types';

/**
 * ---------------------------------------------------
 * CREATE
 * ---------------------------------------------------
 */
export const createRequest = (payload) => ({
  type: types.CREATE_REQUEST,
  payload,
});
export const createSuccess = (payload) => ({
  type: types.CREATE_SUCCESS,
  payload,
});
export const createFailure = () => ({ type: types.CREATE_FAILURE });

/**
 * ---------------------------------------------------
 * READ
 * ---------------------------------------------------
 */
 export const readRequest = () => ({
  type: types.READ_REQUEST,
});
export const readSuccess = (payload) => ({
  type: types.READ_SUCCESS,
  payload,
});
export const readFailure = () => ({ type: types.READ_FAILURE });

/**
 * ---------------------------------------------------
 * UPDATE
 * ---------------------------------------------------
 */
 export const updateRequest = (payload) => ({
  type: types.UPDATE_REQUEST,
  payload,
});
export const updateSuccess = (payload) => ({
  type: types.UPDATE_SUCCESS,
  payload,
});
export const updateFailure = () => ({ type: types.UPDATE_FAILURE });

/**
 * ---------------------------------------------------
 * DELETE
 * ---------------------------------------------------
 */
 export const deleteRequest = (id) => ({
  type: types.DELETE_REQUEST,
  id,
});
export const deleteSuccess = (payload) => ({
  type: types.DELETE_SUCCESS,
  payload,
});
export const deleteFailure = () => ({ type: types.DELETE_FAILURE });
