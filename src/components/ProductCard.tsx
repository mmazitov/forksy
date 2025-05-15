'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MdEditSquare, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { openModal, setCurrentProduct } from '@/lib/redux/toggleModal/slice';
import { ProductProps } from '@/lib/types/types';

const ProductCard = ({ product, session }: ProductProps) => {
	const user = session?.user;

	const dispatch = useDispatch();
	const [favorite, setFavorite] = useState(false);

	const handleFavoriteClick = () => {
		setFavorite((prev) => !prev);
	};

	const handleEditClick = () => {
		dispatch(setCurrentProduct(product));
		dispatch(openModal('isProductEdit'));
	};

	return (
		<div className="flex items-start gap-[var(--space)] p-[var(--space)] border border-[var(--card-border)] rounded-[var(--radius)]">
			<div>
				<Image
					src={product.image}
					alt={product.name}
					width={150}
					height={150}
				/>
			</div>
			<div className="grow-1">
				<div className="flex justify-between items-start">
					<h2 className="font-bold text-lg capitalize">{product.name}</h2>
					<ul className="flex gap-[var(--space)]">
						{/* {user?.role === 'ADMIN' ? ( */}
						{user && (
							<li className="cursor-pointer" onClick={handleEditClick}>
								<MdEditSquare />
							</li>
						)}
						<li onClick={handleFavoriteClick} className="cursor-pointer">
							{favorite ? <MdFavorite /> : <MdFavoriteBorder />}
						</li>
					</ul>
				</div>
				<p className="mb-[calc(var(--space)/2)]">
					<span className="font-medium">Категорія:</span> {product.category}
				</p>
				<ul className="flex flex-wrap gap-x-[calc(var(--space)/4)]">
					<li>
						<span className="font-medium">Калорії:</span> {product.calories},
					</li>
					<li>
						<span className="font-medium">Білки:</span> {product.protein},
					</li>
					<li>
						<span className="font-medium">Жири:</span> {product.fat},
					</li>
					<li>
						<span className="font-medium">Вуглеводи:</span>{' '}
						{product.carbohydrates}
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProductCard;
