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
  ErrorMessage,
  AuthLink,
  FormActions
} from './Auth.styles';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <GuestLayout>
      <Head title="Register" />
      <AuthContainer>
        <AuthForm onSubmit={submit}>
          <InputGroup>
            <AuthLabel htmlFor="name">Name</AuthLabel>
            <AuthInput
              id="name"
              name="name"
              value={data.name}
              autoComplete="name"
              autoFocus
              onChange={(e) => setData('name', e.target.value)}
              required
            />
            {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <AuthLabel htmlFor="email">Email</AuthLabel>
            <AuthInput
              id="email"
              type="email"
              name="email"
              value={data.email}
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
              required
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
              autoComplete="new-password"
              onChange={(e) => setData('password', e.target.value)}
              required
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <AuthLabel htmlFor="password_confirmation">Confirm Password</AuthLabel>
            <AuthInput
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              required
            />
            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation}</ErrorMessage>}
          </InputGroup>
          
          <InputGroup>
            <AuthLabel htmlFor="user_type">Tipo de usuário</AuthLabel>
                <select id="user_type" name="user_type" disabled defaultValue="usuario-comum" style={{ padding: '0.5rem', borderRadius: '4px' }}>
                    <option value="usuario-comum">Usuário Comum</option>
                </select>
          </InputGroup>

          <FormActions>
            <AuthLink href={route('login')}>
              Already registered?
            </AuthLink>
            <AuthButton disabled={processing}>
              Register
            </AuthButton>
          </FormActions>
        </AuthForm>
      </AuthContainer>
    </GuestLayout>
  );
}