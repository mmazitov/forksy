import { useChangePassword } from '../hooks/useChangePassword';

import { Button, FormInput } from '@/shared/components';

const ChangePasswordForm = () => {
	const { register, handleSubmit, errors, loading, onSubmit } =
		useChangePassword();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<FormInput
				id="current-password"
				label="Поточний пароль"
				registration={register('currentPassword')}
				error={errors.currentPassword}
				showToggle
			/>
			<FormInput
				id="new-password"
				label="Новий пароль"
				registration={register('newPassword')}
				error={errors.newPassword}
				showToggle
			/>
			<FormInput
				id="confirm-password"
				label="Підтвердіть пароль"
				registration={register('confirmPassword')}
				error={errors.confirmPassword}
				showToggle
			/>
			<div className="flex justify-end">
				<Button type="submit" disabled={loading}>
					{loading ? 'Збереження...' : 'Змінити пароль'}
				</Button>
			</div>
		</form>
	);
};

export default ChangePasswordForm;
