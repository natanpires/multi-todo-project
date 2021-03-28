import { callApiBase } from './base';

const taskApi = {
  create: (data, projectId) =>
    callApiBase({
      title: 'Task - Create',
      endpoint: '/tasks/'+projectId,
      method: 'POST',
      data,
    }),
  read: (id) =>
    callApiBase({
      title: 'Task - Read',
      endpoint: '/tasks/'+id,
      method: 'GET',
    }),
  update: (data, id) =>
    callApiBase({
      title: 'Task - Update',
      endpoint: '/tasks/'+id,
      method: 'PUT',
      data,
    }),
  delete: (id) =>
    callApiBase({
      title: 'Task - Delete',
      endpoint: '/tasks/'+id,
      method: 'DELETE',
    }),
};

export default taskApi;
export { taskApi };
