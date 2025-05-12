import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ProductForm from './ProductForm';
import * as Style from './Product.styles';

export default function Create({ auth, categories }) {
    console.log(categories);
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Adicionar Produto" />
            <Style.Container>
                <Style.MaxWidthContainer>
                    <h2 className="text-lg font-medium text-gray-900">Adicionar Novo Produto</h2>
                    <ProductForm categories={categories}/>
                </Style.MaxWidthContainer>
            </Style.Container>
        </AuthenticatedLayout>
    );
}
