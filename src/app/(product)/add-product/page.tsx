import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import prisma from '@/lib/db/prisma';

export const metadata: Metadata = {
	title: 'Add product - Flowmazon',
};

const addProduct = async (formData: FormData) => {
	'use server';
	const name = formData.get('name') as string;
	const category = formData.get('category') as string;
	const imageUrl = formData.get('imageUrl') as string;
	const protein = Number(formData.get('protein'));
	const carbohydrates = Number(formData.get('carbohydrates'));
	const fat = Number(formData.get('fat'));
	const fiber = Number(formData.get('fiber'));

	await prisma.product.create({
		data: {
			name,
			category,
			imageUrl,
			protein,
			carbohydrates,
			fat,
			fiber,
		},
	});
	redirect('/');
};

const AddProductPage = () => {
	return (
		<div>
			<h1>Add Product</h1>
			<form action={addProduct}>
				<div className="">
					<label htmlFor="name">Name</label>
					<Input
						placeholder="Product name"
						name="name"
						type="text"
						id="name"
						required
					/>
				</div>
				<div className="">
					<label htmlFor="category">Category</label>
					<Input
						placeholder="Product Category"
						name="category"
						type="text"
						id="category"
						required
					/>
				</div>
				<div className="">
					<label htmlFor="imageUrl">Image</label>
					<Input
						placeholder="Product Image"
						name="imageUrl"
						type="text"
						id="imageUrl"
						required
					/>
				</div>

				<div className="flex justify-between items-center">
					<div className="">
						<label htmlFor="protein">Protein</label>
						<Input
							placeholder="Product Protein"
							name="protein"
							type="text"
							id="protein"
							required
						/>
					</div>

					<div className="">
						<label htmlFor="carbohydrates">Carbohydrates</label>
						<Input
							placeholder="Product Carbohydrates"
							name="carbohydrates"
							type="text"
							id="carbohydrates"
							required
						/>
					</div>

					<div className="">
						<label htmlFor="fat">Fat</label>
						<Input
							placeholder="Product Fat"
							name="fat"
							type="text"
							id="fat"
							required
						/>
					</div>

					<div className="">
						<label htmlFor="fiber">Fiber</label>
						<Input
							placeholder="Product Fiber"
							name="fiber"
							type="text"
							id="fiber"
							required
						/>
					</div>
				</div>
				<div className="">
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</div>
	);
};

export default AddProductPage;
