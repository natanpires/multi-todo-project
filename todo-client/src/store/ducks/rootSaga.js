import { fork, all } from 'redux-saga/effects';
import { sagas as projectSagas } from './project';

const allSagas = [
  ...projectSagas,
];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => fork(saga)));
}
