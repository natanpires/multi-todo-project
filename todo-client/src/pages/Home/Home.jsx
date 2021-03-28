import { useState, useEffect, useCallback } from 'react';

import { Container } from '../../layout/default';

import Navbar from '../../components/Navbar';
import Project from '../../components/Project';
import ProjectForm from '../../components/ProjectForm';


import { projectApi } from '../../services'

import * as S from './styles';

function Home() {
  const [projects, setProjects] = useState([]);

  const getProjects = useCallback(async () => {
    const { data } = await projectApi.read()
    setProjects(data || []);
  }, []);

  useEffect(() => {
    getProjects();
  }, [getProjects]);

  const handleRemoveProject = (id) => {
    setProjects((state) => state.filter((p) => p.projectId !== id));
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
