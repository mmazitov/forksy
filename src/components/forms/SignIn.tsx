'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { closeModal, openModal } from '@/lib/redux/toggleModal/slice';
import { signInSchema } from '@/lib/utils/schemas/validate';

import SocialAuth from '../SocialAuth';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import FormHeader from './FormHeader';

// Define type for form data based on the schema
type SignInFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
	const [isChecked, setIsChecked] = useState(false);
	const dispatch = useDispatch();

	// Set up react-hook-form with zod validation
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInFormData>({
		resolver: zodResolver(signInSchema),
	});

	// Handle form submission
	const onSubmit = async (data: SignInFormData) => {
		try {
			console.log('Form data:', data);
			// Here you would typically call your authentication API
			// Example: await signIn(data.email, data.password);
			dispatch(closeModal('isSignIn'));
		} catch (error) {
			console.error('Sign in failed:', error);
		}
	};

	const switchToSignUp = () => {
		dispatch(closeModal('isSignIn'));
		dispatch(openModal('isSignUp'));
	};

	return (
		<>
			<FormHeader
				title="Привіт"
				caption="Авторизуйтесь, щоб продовжити"
				showCancel={true}
				modalType="isSignIn"
			/>
			<form
				className="flex flex-col gap-[20px] mb-[35px]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Input
						placeholder="Пошта"
						type="text"
						className={errors.email ? 'input-error' : ''}
						{...register('email')}
					/>
				</div>
				<div>
					<Input
						placeholder="Пароль"
						type="password"
						showToggle={true}
						className={errors.password ? 'input-error' : ''}
						{...register('password')}
					/>
				</div>
				<div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? 'Авторизація...' : 'Увійти'}
					</Button>
				</div>
				<div className="flex justify-between items-center">
					<Checkbox
						label="Remember me"
						checked={isChecked}
						onChange={(e) => setIsChecked(e.target.checked)}
					/>
				</div>
			</form>
			<p className="mb-[12px] text-[12px] md:text-[14px] text-center">
				Чи увійдіть за допомогою соціальних мереж
			</p>
			<SocialAuth />
			<p className="text-[10px] md:text-[14px] text-center">
				Не маете аккаунту?{' '}
				<span
					className="text-[var(--main-color)] hover:underline cursor-pointer"
					onClick={switchToSignUp}
				>
					Зареєструватись
				</span>
			</p>
		</>
	);
};

export default SignIn;
