import { useForm } from 'react-hook-form';

import { FormInputWrapper } from '../../layout/default';

import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { userApi } from '../../services'
import { login } from '../../utils/auth'
import { useRouter } from '../../utils/router';

function SignUp() {
  const router = useRouter();

  const { register, handleSubmit, reset, errors } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      const { data: auth } = await userApi.signup(data);
      login(auth.accessToken, auth.name);
      router.push('/');
    } catch (err) {
      reset({ ...data, password: '', passwordConfirmation: '' });
    }
  };

  return (
    <AuthLayout action={{ link: '/', title: 'Login' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputWrapper>
          <Input name="name" ref={register({ required: true })} placeholder="Name" error={!!errors.name} />
        </FormInputWrapper>

        <FormInputWrapper>
          <Input name="email" type="email" ref={register({ required: true })} placeholder="Email" error={!!errors.email} />
        </FormInputWrapper>

        <FormInputWrapper>
          <Input
            name="password"
            type="password"
            ref={register({ required: true })}
            placeholder="Password"
            error={!!errors.password}
          />
        </FormInputWrapper>

        <FormInputWrapper>
          <Input
            name="passwordConfirmation"
            type="password"
            ref={register({ required: true })}
            placeholder="Confirm password"
            error={!!errors.passwordConfirmation}
          />
        </FormInputWrapper>

        <Button fullWidth type="submit">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}

export default SignUp;
