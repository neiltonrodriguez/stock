import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import * as Style from './Product.styles';
import { Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Product({ auth, can, products, filters: initialFilters, categories }) {
    const { delete: destroy } = useForm();
    const [filters, setFilters] = useState({
        name: initialFilters.name || '',
        category: initialFilters.category || '',
        min_price: initialFilters.min_price || '',
        max_price: initialFilters.max_price || '',
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        router.get(route('product.index'), filters, {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setFilters({
            name: '',
            category: '',
            min_price: '',
            max_price: '',
        });
        router.get(route('product.index'));
    };

    return (
        <AuthenticatedLayout
            user={auth?.user || null}
        >
            <Head title="Produtos" />

            <Style.Container>
                <Style.MaxWidthContainer>
                    <Style.Card>
                        <Style.CardContent>
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center justify-center">Estoque de Produtos</h2>
                                {can?.create && (
                                    <div className="flex items-center justify-center">
                                        <Link
                                            href={route('product.create')}
                                            className="bg-red-950 no-underline text-white px-4 py-2 rounded hover:bg-red-950"
                                        >
                                            Adicionar Produto
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Filtros */}
                            <Style.FilterContainer>
                                <Style.FilterTitle>Filtrar Produtos</Style.FilterTitle>
                                <Style.FilterGrid>
                                    <Style.FilterGroup>
                                        <Style.Label htmlFor="name">Nome</Style.Label>
                                        <Style.Input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={filters.name}
                                            onChange={handleFilterChange}
                                            placeholder="Pesquisar por nome"
                                        />
                                    </Style.FilterGroup>

                                    <Style.FilterGroup>
                                        <Style.Label htmlFor="category">Categoria</Style.Label>
                                        <Style.Select
                                            id="category"
                                            name="category"
                                            value={filters.category}
                                            onChange={handleFilterChange}
                                        >
                                            <option value="">Todas as categorias</option>
                                            {categories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </Style.Select>
                                    </Style.FilterGroup>

                                    <Style.FilterGroup>
                                        <Style.Label htmlFor="min_price">Preço Mínimo</Style.Label>
                                        <Style.Input
                                            type="number"
                                            id="min_price"
                                            name="min_price"
                                            value={filters.min_price}
                                            onChange={handleFilterChange}
                                            placeholder="R$ 0,00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </Style.FilterGroup>

                                    <Style.FilterGroup>
                                        <Style.Label htmlFor="max_price">Preço Máximo</Style.Label>
                                        <Style.Input
                                            type="number"
                                            id="max_price"
                                            name="max_price"
                                            value={filters.max_price}
                                            onChange={handleFilterChange}
                                            placeholder="R$ 0,00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </Style.FilterGroup>
                                </Style.FilterGrid>

                                <Style.FilterButtonGroup>
                                    <Style.Button onClick={applyFilters}>
                                        Aplicar Filtros
                                    </Style.Button>
                                    <Style.SecondaryButton onClick={resetFilters}>
                                        Limpar Filtros
                                    </Style.SecondaryButton>
                                </Style.FilterButtonGroup>
                            </Style.FilterContainer>

                            <Style.Table>
                                <thead>
                                    <tr>
                                        <Style.Th>Produto</Style.Th>
                                        <Style.Th>Descrição</Style.Th>
                                        <Style.Th>Quantidade</Style.Th>
                                        <Style.Th>Preço</Style.Th>
                                        <Style.Th>Categoria</Style.Th>
                                        <Style.Th>SKU</Style.Th>
                                        {(can.update || can.delete) && (
                                            <Style.Th>Ação</Style.Th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.map((product) => (
                                        <Style.Tr key={product.id}>
                                            <Style.Td>{product.product_name}</Style.Td>
                                            <Style.Td>{product.description}</Style.Td>
                                            <Style.Td>{product.quantity_available}</Style.Td>
                                            <Style.Td>R$ {product.price}</Style.Td>
                                            <Style.Td>{product.category}</Style.Td>
                                            <Style.Td>{product.sku}</Style.Td>
                                            {(can.update || can.delete) && (
                                                <Style.Td>
                                                    <div className="flex items-center justify-between">
                                                        {can.update && (
                                                            <Link href={route('product.edit', product.id)} className="text-blue-600 hover:text-blue-900">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                </svg>
                                                            </Link>
                                                        )}
                                                        {can.delete && (
                                                            <button
                                                                onClick={() => {
                                                                    if (confirm('Tem certeza que deseja excluir este produto?')) {
                                                                        destroy(route('product.destroy', product.id));
                                                                    }
                                                                }}
                                                                className="text-red-900 cursor-pointer hover:text-red-900 ml-2 bg-transparent border-none"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                    <path d="M3 6h18"></path>
                                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                                    <line x1="10" y1="11" x2="10" y2="17"></line>
                                                                    <line x1="14" y1="11" x2="14" y2="17"></line>
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </Style.Td>
                                            )}
                                        </Style.Tr>
                                    ))}
                                </tbody>
                            </Style.Table>

                            {/* Paginação - atualize para preservar os filtros */}
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    Mostrando {products.from} a {products.to} de {products.total} itens
                                </div>
                                <div className="flex space-x-1">
                                    {products.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url ? `${link.url}&${new URLSearchParams(filters)}` : ''}
                                            className={`px-3 py-1 rounded ${link.active
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-200 text-gray-700'
                                                } ${!link.url ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Style.CardContent>
                    </Style.Card>
                </Style.MaxWidthContainer>
            </Style.Container>
        </AuthenticatedLayout>
    );
}