import styled from 'styled-components';
import { Link } from '@inertiajs/react';

export const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.main};

  &::selection {
    background-color: ${({ theme }) => theme.colors.danger};
    color: white;
  }
`;

export const LinksContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`;

export const NavLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  padding: ${({ theme }) => theme.spacing.small} ${({ theme }) => theme.spacing.medium};
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.colors.light};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.danger};
    outline-offset: 2px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.medium} ${({ theme }) => theme.spacing.large};
  }
`;