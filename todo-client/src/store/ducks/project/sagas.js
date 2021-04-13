import { put, call, takeEvery } from 'redux-saga/effects';
import * as projectActions from './actions';
import { projectApi } from '../../../services';
import * as types from './types'


/**
 * ---------------------------------------------------
 * PROJECTS
 * ---------------------------------------------------
 */
export function* create({ payload }) {
  try {
    const response = yield call(projectApi.create, payload.data);

    if (response.status >= 200 && response.status <= 299) {
      yield put(
        projectActions.createSuccess({
          projects: response.data,
        })
      );
    }
  } catch (error) {
    if (error.response) {
      yield put(projectActions.createFailure());
    }
  }
}

export function* read() {
  try {
    const response = yield call(projectApi.read);
    if (response.status >= 200 && response.status <= 299) {
      yield put(
        projectActions.readSuccess({
          projects: response.data,
        })
      );
    }
  } catch (error) {
    if (error.response) {
      yield put(projectActions.readFailure());
    }
  }
}

export function* update({ payload }) {
  try {
    const response = yield call(projectApi.update, payload.data);

    if (response.status >= 200 && response.status <= 299) {
      yield put(
        projectActions.updateSuccess({
          projects: response.data,
        })
      );
    }
  } catch (error) {
    if (error.response) {
      yield put(projectActions.updateFailure());
    }
  }
}

export function* remove({ id }) {
  try {
    const response = yield call(projectApi.delete, id);

    if (response.status >= 200 && response.status <= 299) {
      yield put(
        projectActions.deleteSuccess({ id })
      );
    }
  } catch (error) {
    if (error.response) {
      yield put(projectActions.deleteFailure());
    }
  }
}

export function* watchProject() {
  yield takeEvery(types.CREATE_REQUEST, create);
  yield takeEvery(types.READ_REQUEST, read);
  yield takeEvery(types.UPDATE_REQUEST, update);
  yield takeEvery(types.DELETE_REQUEST, remove);
}

export const sagas = [watchProject];
