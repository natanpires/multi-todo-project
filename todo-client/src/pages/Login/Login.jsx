import { useForm } from 'react-hook-form';

import { FormInputWrapper } from '../../layout/default'

import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { userApi } from '../../services'
import { login } from '../../utils/auth'
import { useRouter } from '../../utils/router';

function Login() {
  const router = useRouter();

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { data: auth } = await userApi.login(data);
      login(auth.accessToken, auth.name);
      router.push('/');
    } catch (err) {
      reset();
    }
  };

  return (
    <AuthLayout action={{ link: '/signup', title: 'Register' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputWrapper>
          <Input name="email" type="email" ref={register({ required: true })} placeholder="Email" error={!!errors.email} />
        </FormInputWrapper>

        <FormInputWrapper>
          <Input name="password" type="password" ref={register({ required: true })} placeholder="Senha" error={!!errors.password} />
        </FormInputWrapper>

        <Button fullWidth type="submit">
          Login
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
