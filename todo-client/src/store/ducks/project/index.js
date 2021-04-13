import * as types from './types';
import * as actions from './actions';
import { sagas } from './sagas';

const INITIAL_STATE = {
  error: null,
  initiatedGetAllProjectsRequest: false,
  projects: [],
};

export default function stateControl(state = INITIAL_STATE, action) {
  switch (action.type) {
    // CREATE
    case types.CREATE_REQUEST:
      return { ...state, error: false };
    case types.CREATE_SUCCESS:
      return {
        ...state,
        error: false,
        projects: action.payload.projects,
      };
    case types.CREATE_FAILURE:
      return { ...state, error: true };

    // READ
    case types.READ_REQUEST:
      return { ...state, error: true };
    case types.READ_SUCCESS:
      return {
        ...state,
        error: false,
        projects: action.payload.projects,
      };
    case types.READ_FAILURE:
      return { ...state, error: false };

    // UPDATE
    case types.UPDATE_REQUEST:
      return { ...state, error: true };
    case types.UPDATE_SUCCESS:
      return {
        ...state,
        error: false,
        projects: action.payload.projects,
      };
    case types.UPDATE_FAILURE:
      return { ...state, error: false };

    // DELETE
    case types.DELETE_REQUEST:
      return { ...state, error: true };
    case types.DELETE_SUCCESS:
      return {
        ...state,
        error: false,
        projects: state.projects.filter((p) => p.projectId !== action.payload.id),
      };
    case types.DELETE_FAILURE:
      return { ...state, error: false };

    // DEFAULT
    default:
      return state;
  }
}

export { actions, sagas };
