import { useForm } from '@inertiajs/react';
import * as Style from './Product.styles';

export default function ProductForm({
    product = null,
    onSubmit,
    categories = [],
    isEdit = false,
    data: externalData,
    setData: externalSetData,
    processing: externalProcessing,
    errors: externalErrors
}) {
    const {
        data,
        setData,
        post,
        put,
        processing,
        errors
    } = useForm({
        product_name: product?.product_name || '',
        description: product?.description || '',
        quantity_available: product?.quantity_available || 0,
        price: product?.price || 0,
        category: product?.category || '',
        sku: product?.sku || ''
    });

    // Usa os dados externos se forem fornecidos (caso de edição)
    const formData = externalData || data;
    const updateData = externalSetData || setData;
    const isProcessing = externalProcessing !== undefined ? externalProcessing : processing;
    const formErrors = externalErrors || errors;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onSubmit) {
            onSubmit(formData);
        } else {
            // Se não vier uma função externa, decide se é POST ou PUT
            const method = isEdit ? put : post;
            const routeName = isEdit ? route('product.update', product.id) : route('product.store');

            method(routeName, {
                onSuccess: () => console.log('Salvo com sucesso!'),
                onError: (err) => console.error('Erros:', err)
            });
        }
    };

    return (
        <Style.Form onSubmit={handleSubmit}>
            <div>
                <Style.Label htmlFor="product_name">Nome do Produto</Style.Label>
                <Style.Input
                    id="product_name"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                />
                {formErrors.product_name && <div>{formErrors.product_name}</div>}
            </div>

            <div>
                <Style.Label htmlFor="description">Descrição</Style.Label>
                <Style.Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                {formErrors.description && <div>{formErrors.description}</div>}
            </div>

            <div>
                <Style.Label htmlFor="quantity_available">Quantidade</Style.Label>
                <Style.Input
                    id="quantity_available"
                    name="quantity_available"
                    type="number"
                    value={formData.quantity_available}
                    onChange={handleChange}
                />
                {formErrors.quantity_available && <div>{formErrors.quantity_available}</div>}
            </div>

            <div>
                <Style.Label htmlFor="price">Preço</Style.Label>
                <Style.Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    maxLength="8"
                    value={formData.price}
                    onChange={handleChange}
                />
                {formErrors.price && <div>{formErrors.price}</div>}
            </div>

            <div>
                <Style.Label htmlFor="category">Categoria</Style.Label>
                <Style.Select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Selecione</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </Style.Select>
                {formErrors.category && <div>{formErrors.category}</div>}
            </div>

            <div>
                <Style.Label htmlFor="sku">SKU</Style.Label>
                <Style.Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                />
                {formErrors.sku && <div>{formErrors.sku}</div>}
            </div>

            <Style.Button type="submit" disabled={isProcessing}>
                {isProcessing ? 'Salvando...' : isEdit ? 'Atualizar' : 'Salvar'}
            </Style.Button>
        </Style.Form>
    );
}
