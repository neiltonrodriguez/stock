import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { 
  AuthContainer,
  AuthForm,
  InputGroup,
  AuthLabel,
  AuthInput,
  AuthButton,
  StatusMessage,
  ErrorMessage,
  AuthLink,
  CheckboxContainer,
  CheckboxLabel,
  FormActions
} from './Auth.styles';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => {
      reset('password');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <GuestLayout>
      <Head title="Log in" />
      <AuthContainer>
        {status && <StatusMessage>{status}</StatusMessage>}

        <AuthForm onSubmit={submit}>
          <InputGroup>
            <AuthLabel htmlFor="email">Email</AuthLabel>
            <AuthInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              autoComplete="username"
              autoFocus
              onChange={(e) => setData('email', e.target.value)}
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <AuthLabel htmlFor="password">Password</AuthLabel>
            <AuthInput
              id="password"
              type="password"
              name="password"
              value={data.password}
              autoComplete="current-password"
              onChange={(e) => setData('password', e.target.value)}
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <CheckboxContainer>
            <input
              type="checkbox"
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
            />
            <CheckboxLabel>Remember me</CheckboxLabel>
          </CheckboxContainer>

          <FormActions>
            {canResetPassword && (
              <AuthLink href={route('password.request')}>
                Forgot your password?
              </AuthLink>
            )}
            <AuthButton disabled={processing}>
              Log in
            </AuthButton>
          </FormActions>
        </AuthForm>
      </AuthContainer>
    </GuestLayout>
  );
}