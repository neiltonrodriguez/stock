import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import ProductForm from './ProductForm';
import * as Style from './Product.styles';

export default function Edit({ auth, product, categories }) {
    const { data, setData, put, processing, errors } = useForm({
        product_name: product.product_name || '',
        description: product.description || '',
        quantity_available: product.quantity_available || 0,
        price: product.price || 0,
        category: product.category || '',
        sku: product.sku || ''
    });

   const handleSubmit = (formData) => {
        put(route('product.update', product.id), {
            ...formData,
            onSuccess: () => console.log('Produto atualizado com sucesso!'),
            onError: (errors) => console.error('Erros:', errors),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Editar Produto" />
            <Style.Container>
                <Style.MaxWidthContainer>
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Editar Produto</h2>
                    <ProductForm
                        data={data}
                        setData={setData}
                        onSubmit={handleSubmit}
                        processing={processing}
                        errors={errors}
                        categories={categories}
                        isEdit={true}
                    />
                </Style.MaxWidthContainer>
            </Style.Container>
        </AuthenticatedLayout>
    );
}
