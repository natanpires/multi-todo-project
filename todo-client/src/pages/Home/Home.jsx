import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '../../layout/default';

import Navbar from '../../components/Navbar';
import Project from '../../components/Project';
import ProjectForm from '../../components/ProjectForm';

import { actions as projectActions } from '../../store/ducks/project';

import * as S from './styles';

function Home() {
  const dispatch = useDispatch();
  const { projects } = useSelector(state => state.project);

  const getProjects = useCallback(async () => {
    dispatch(projectActions.readRequest())
  }, [dispatch]);

  useMemo(() => {
    getProjects();
  }, [getProjects]);

  const handleRemoveProject = (id) => {
    dispatch(projectActions.deleteRequest(id))
  };

  return (
    <>
      <Navbar />

      <Container>
        <S.Content>
          {projects?.map((project) => (
            <Project key={project.projectId} {...project} onRemove={handleRemoveProject} />
          ))}

          <ProjectForm onAdded={getProjects} />
        </S.Content>
      </Container>
    </>
  );
}

export default Home;
