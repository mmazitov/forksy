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
import FormHeader from '../ui/FormHeader';
import Input from '../ui/Input';

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
				title="Welcome!"
				caption="Sign in to continue"
				showCancel={true}
				modalType="isSignIn"
			/>
			<form
				className="flex flex-col gap-[20px] mb-[35px]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Input
						placeholder="Email"
						type="text"
						required
						className={errors.email ? 'border-red-500' : ''}
						{...register('email')}
					/>
				</div>
				<div>
					<Input
						placeholder="Password"
						type="password"
						showToggle={true}
						required
						className={errors.password ? 'border-red-500' : ''}
						{...register('password')}
					/>
				</div>
				<div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? 'Signing in...' : 'Sign In'}
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
				Or login with
			</p>
			<SocialAuth />
			<p className="text-[10px] md:text-[14px] text-center">
				Dont have an account?{' '}
				<span
					className="text-[var(--main-color)] hover:underline cursor-pointer"
					onClick={switchToSignUp}
				>
					Sign up
				</span>
			</p>
		</>
	);
};

export default SignIn;
