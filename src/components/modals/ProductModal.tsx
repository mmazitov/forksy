'use client';

import { useSelector } from 'react-redux';

import ProductEditForm from '@/components/forms/ProductEditForm';
import CloseButton from '@/components/ui/CloseButton';

const ProductModal = () => {
	const { isProductEdit, currentProduct } = useSelector(
		(state: any) => state.persisted.modal,
	);

	if (!isProductEdit) return null;

	return (
		<div className="z-50 fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
			<div className="relative bg-[var(--background)] p-6 border border-[var(--black-color-weak)] rounded-[var(--radius)] w-full max-w-[500px]">
				<CloseButton
					modalType="isProductEdit"
					className="top-4 right-4 absolute"
				/>
				<h2 className="mb-4 font-bold text-xl">Редагування продукту</h2>
				<ProductEditForm currentProduct={currentProduct} />
			</div>
		</div>
	);
};

export default ProductModal;
