import { useForm } from 'react-hook-form';
import { useRouter } from '../../utils/router'

import { Container, FormInputWrapper } from '../../layout/default';

import Button from '../../components/Button';
import Input from '../../components/Input';
import Navbar from '../../components/Navbar';

import { taskApi } from '../../services'

import * as S from './styles';

function UpdateTask() {
  const router = useRouter();
  const { id } = router.query;

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    await taskApi.update(data, id);
    router.push('/');
  };

  return (
    <>
      <Navbar />

      <Container>
        <S.Wrapper>
          <S.Title>Update Task</S.Title>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputWrapper>
              <Input
                name="name"
                placeholder="Task"
                ref={register({ required: true })}
                error={!!errors.name}
                defaultValue={""}
              />
            </FormInputWrapper>
            <Button fullWidth type="submit">
              Save
            </Button>
          </form>
        </S.Wrapper>
      </Container>
    </>
  );
}

export default UpdateTask;
