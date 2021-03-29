import { useRouter } from '../../utils/router'

import { Container } from '../../layout/default';

import Navbar from '../../components/Navbar';
import ProjectForm from '../../components/ProjectForm';

import * as S from './styles';

function UpdateProject() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Navbar />

      <Container>
        <S.Wrapper>
          <ProjectForm projectId={id} />
        </S.Wrapper>
      </Container>
    </>
  );
}

export default UpdateProject;
