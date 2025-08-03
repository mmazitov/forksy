'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
	checkTranslationExists,
	createTranslation,
} from '@/app/api/translations/actions';
import { translationSchema } from '@/lib/utils/schemas/validate';

import Button from '../ui/Button';
import Input from '../ui/Input';

type TranslationFormData = z.infer<typeof translationSchema>;

const TranslationAddForm = () => {
	const [existsError, setExistsError] = useState<string>('');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		watch,
	} = useForm<TranslationFormData>({
		resolver: zodResolver(translationSchema),
	});

	const ukrainian = watch('ukrainian');

	useEffect(() => {
		const checkExists = async () => {
			if (ukrainian && ukrainian.length > 2) {
				const result = await checkTranslationExists(ukrainian);
				if (result.success && result.exists) {
					setExistsError('Такий переклад вже існує');
				} else {
					setExistsError('');
				}
			}
		};

		const timeoutId = setTimeout(checkExists, 500);
		return () => clearTimeout(timeoutId);
	}, [ukrainian]);

	const onSubmit = async (data: TranslationFormData) => {
		if (existsError) {
			return;
		}
		try {
			const result = await createTranslation(data);
			if (result.success) {
				reset(); // Clear form on success
				// Trigger custom event to refresh the table
				const event = new CustomEvent('translationAdded');
				window.dispatchEvent(event);
			} else {
				console.error('Failed to add translation:', result.error);
			}
		} catch (error) {
			console.error('Failed to add translation:', error);
		}
	};

	return (
		<form
			className="flex flex-col gap-[var(--space)]"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<label htmlFor="ukrainian" className="block font-medium">
					Назва українською
				</label>
				<Input
					placeholder="Назва продукту"
					type="text"
					id="ukrainian"
					className={errors.ukrainian || existsError ? 'input-error' : ''}
					{...register('ukrainian')}
				/>
				{existsError && (
					<p className="mt-1 text-[var(--error-text)] text-sm">{existsError}</p>
				)}
			</div>
			<div>
				<label htmlFor="english" className="block font-medium">
					Назва англійською
				</label>
				<Input
					placeholder="Product name"
					type="text"
					id="english"
					className={errors.english ? 'input-error' : ''}
					{...register('english')}
				/>
			</div>
			<div className="flex gap-[var(--space)]">
				<Button type="button" variant="ghost" onClick={() => reset()}>
					Скинути
				</Button>
				<Button type="submit">Додати</Button>
			</div>
		</form>
	);
};

export default TranslationAddForm;
