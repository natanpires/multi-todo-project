import { callApiBase } from './base';

const projectApi = {
  create: (data) =>
    callApiBase({
      title: 'Project - Create',
      endpoint: '/projects/',
      method: 'POST',
      data,
    }),
  read: () =>
    callApiBase({
      title: 'Project - Read',
      endpoint: '/projects/',
      method: 'GET',
    }),
  update: (data, id) =>
    callApiBase({
      title: 'Project - Update',
      endpoint: '/projects/'+id,
      method: 'PUT',
      data,
    }),
  delete: (id) =>
    callApiBase({
      title: 'Project - Delete',
      endpoint: '/projects/'+id,
      method: 'DELETE',
    }),
};

export default projectApi;
export { projectApi };
