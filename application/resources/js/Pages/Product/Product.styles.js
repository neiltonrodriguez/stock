import styled from 'styled-components';
import { Link } from '@inertiajs/react';


export const Container = styled.div`
  padding: 3rem 0;
`;

export const MaxWidthContainer = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

export const Card = styled.div`
    ${({ theme }) => `
        background-color: ${theme.colors.background};
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    `}
`;

export const CardContent = styled.div`
    ${({ theme }) => `
        padding: 1.5rem;
        color: ${theme.colors.primary};
    `}
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

export const Th = styled.th`
  ${({ theme }) => `
    padding: 0.75rem 1rem;
    text-align: left;
    background-color: ${theme.colors.primary};
    color: white;
    font-weight: 500;
  `}
`;

export const Td = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f8fafc;
  }
`;

export const Linkk = styled(Link)`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PaginationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;
`;

export const PaginationButton = styled(Link)`
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    margin: 0 0.25rem;
    
    ${({ active, theme }) => active ? `
        background-color: ${theme.colors.primary};
        color: white;
    ` : `
        background-color: #edf2f7;
        color: #4a5568;
        
        &:hover {
            background-color: #e2e8f0;
        }
    `}
    
    ${({ disabled }) => disabled && `
        opacity: 0.5;
        cursor: not-allowed;
    `}
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 1rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
`;

export const Label = styled.label`
  ${({ theme }) => `
    display: block;
    font-weight: 500;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
  `}
`;

export const Input = styled.input`
  ${({ theme }) => `
    width: 100%;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    background-color: white;
    color: ${theme.colors.text};
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }
  `}
`;

export const Textarea = styled.textarea`
  ${({ theme }) => `
    width: 100%;
    border: 1px solid #cbd5e0;
    border-radius: 0.375rem;
    background-color: white;
    color: ${theme.colors.text};
    font-size: 1rem;
    resize: vertical;
    min-height: 100px;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }
  `}
`;

export const Button = styled.button`
  ${({ theme }) => `
    padding: 0.75rem 1.5rem;
    background-color: ${theme.colors.primary};
    color: white;
    font-weight: 500;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: ${theme.colors.primaryHover || '#2c5282'};
    }

    &:disabled {
      background-color: #a0aec0;
      cursor: not-allowed;
    }
  `}
`;

export const SecondaryButton = styled.button`
  ${({ theme }) => `
    padding: 0.75rem 1.5rem;
    background-color: transparent;
    border: 1px solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    font-weight: 500;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${theme.colors.primary};
      color: white;
    }
  `}
`;

export const FilterContainer = styled.div`
    ${({ theme }) => `
        background-color: ${theme.colors.background};
        border-radius: 0.5rem;
        padding: 1.5rem;
        margin-bottom: 1.5rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    `}
`;

export const FilterTitle = styled.h3`
    ${({ theme }) => `
        font-size: 1.25rem;
        font-weight: 500;
        color: ${theme.colors.primary};
        margin-bottom: 1.5rem;
    `}
`;

export const FilterGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
    
    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const FilterGroup = styled.div`
    margin-bottom: 1rem;
    padding: 10px
`;

export const FilterButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
`;