import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from '../../utils/router'

import { FormInputWrapper } from '../../layout/default'

import Button from '../Button';
import Input from '../Input';

import { projectApi } from '../../services'

import * as S from './styles';

function ProjectForm({ projectId, onAdded }) {
  const [project, setProject] = useState({
    name: '',
  });

  const { register, handleSubmit, errors, reset } = useForm();
  const router = useRouter();

  useEffect(() => {
    const fetchProject = async () => {
      const { data } = await projectApi.read(projectId);
      setProject({ name: data.name });
    };

    if (projectId) fetchProject();
  }, [projectId]);

  const onSubmit = async (formData) => {
    if (!projectId) {
      await projectApi.create(formData);
      onAdded();
      reset();
    }
    await projectApi.update(formData, projectId);
    router.push('/');
  };

  return (
    <S.Wrapper onSubmit={handleSubmit(onSubmit)}>
      <S.Title>{projectId ? 'Update the project' : 'Create a new project'}</S.Title>

      <FormInputWrapper>
        <Input
          name="name"
          placeholder="Project name"
          ref={register({ required: true })}
          error={!!errors.name}
          defaultValue={project.name}
        />
      </FormInputWrapper>

      <Button fullWidth type="submit">
        {projectId ? 'Update' : 'Create Project'}
      </Button>
    </S.Wrapper>
  );
}

export default ProjectForm;
