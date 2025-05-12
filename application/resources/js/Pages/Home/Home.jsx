import { Head } from '@inertiajs/react';
import { PageContainer, LinksContainer, NavLink } from './Home.styles';

export default function Home({ auth }) {
  return (
    <>
      <Head title="Home" />
      <PageContainer>
        <LinksContainer>
          {auth.user ? (
            <NavLink href={route('product.index')}>Produtos</NavLink>
          ) : (
            <>
              <NavLink href={route('login')}>Log in</NavLink>
              <NavLink href={route('register')}>Register</NavLink>
            </>
          )}
        </LinksContainer>
      </PageContainer>
    </>
  );
}