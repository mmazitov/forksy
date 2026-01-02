import { useMeQuery, useUpdateProfileMutation } from '@/lib/graphql';
import { normalizePhone, phoneValidate } from '@/lib/utils';
import { useState } from 'react';
import { useToast } from './useToast';

interface ProfileFormData {
	name: string;
	phone: string;
	diet?: string;
	allergy?: string[] | string;
	dislike?: string[] | string;
}

export const useProfile = () => {
	const { data, refetch } = useMeQuery();
	const [updateProfile, { loading: updating }] = useUpdateProfileMutation();
	const { toast } = useToast();
	const [isEditMode, setIsEditMode] = useState(false);
	const [formData, setFormData] = useState<ProfileFormData>({
		name: '',
		phone: '',
		diet: '',
		allergy: '',
		dislike: '',
	});

	const user = data?.me;

	const handleEdit = () => {
		setIsEditMode(true);
		setFormData({
			name: user?.name || '',
			phone: user?.phone || '',
			diet: user?.diet || '',
			allergy: user?.allergy?.join(', ') || '',
			dislike: user?.dislike?.join(', ') || '',
		});
	};

	const handleCancel = () => {
		setIsEditMode(false);
		setFormData({
			name: '',
			phone: '',
			diet: '',
			allergy: '',
			dislike: '',
		});
	};

	const handleSave = async () => {
		if (formData.phone && !phoneValidate(formData.phone)) {
			toast({
				title: 'Помилка валідації',
				description: 'Введіть коректний український номер телефону',
				variant: 'destructive',
			});
			return;
		}

		try {
			const normalizedPhone = formData.phone
				? normalizePhone(formData.phone)
				: undefined;

			// Конвертуємо рядки в масиви
			const allergyArray =
				typeof formData.allergy === 'string'
					? formData.allergy
							.split(',')
							.map((item) => item.trim())
							.filter(Boolean)
					: formData.allergy || [];

			const dislikeArray =
				typeof formData.dislike === 'string'
					? formData.dislike
							.split(',')
							.map((item) => item.trim())
							.filter(Boolean)
					: formData.dislike || [];

			await updateProfile({
				variables: {
					name: formData.name || undefined,
					phone: normalizedPhone,
					diet: formData.diet || undefined,
					allergy: allergyArray.length > 0 ? allergyArray : undefined,
					dislike: dislikeArray.length > 0 ? dislikeArray : undefined,
				},
			});

			await refetch();

			toast({
				title: 'Профіль оновлено',
				description: 'Ваші зміни успішно збережені',
			});

			setIsEditMode(false);
		} catch (error) {
			console.error('Failed to update profile:', error);
			toast({
				title: 'Помилка',
				description: 'Не вдалося оновити профіль',
				variant: 'destructive',
			});
		}
	};

	const updateFormData = (field: keyof ProfileFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	return {
		user,
		formData,
		isEditMode,
		updating,
		handleEdit,
		handleCancel,
		handleSave,
		updateFormData,
	};
};
