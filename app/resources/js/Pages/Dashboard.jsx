import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 3rem 0;
`;

const MaxWidthContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Card = styled.div`
    ${({ theme }) => `
        background-color: ${theme.colors.fundo};
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    `}
`;

const CardContent = styled.div`
    ${({ theme }) => `
        padding: 1.5rem;
        color: ${theme.colors.primary};
    `}
`;

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Estoque</h2>}
        >
            <Head title="Dashboard" />

            <Container>
                <MaxWidthContainer>
                    <Card>
                        <CardContent>You're logged in!</CardContent>
                    </Card>
                </MaxWidthContainer>
            </Container>
        </AuthenticatedLayout>
    );
}
