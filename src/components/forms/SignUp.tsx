'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

import { closeModal, openModal } from '@/lib/redux/toggleModal/slice';
import { signUpSchema } from '@/lib/utils/schemas/validate';

import SocialAuth from '../SocialAuth';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import FormHeader from './FormHeader';

// Define type for form data based on the schema
type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
	const [isChecked, setIsChecked] = useState(false);
	const dispatch = useDispatch();

	// Set up react-hook-form with zod validation
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignUpFormData>({
		resolver: zodResolver(signUpSchema),
	});

	// Handle form submission
	const onSubmit = async (data: SignUpFormData) => {
		try {
			console.log('Form data:', data);
			// Here you would typically call your registration API
			// Example: await register(data.name, data.email, data.password);
			dispatch(closeModal('isSignUp'));
		} catch (error) {
			console.error('Sign up failed:', error);
		}
	};

	const switchToSignIn = () => {
		dispatch(closeModal('isSignUp'));
		dispatch(openModal('isSignIn'));
	};

	return (
		<>
			<FormHeader
				title="Create Account"
				caption="Fill in your details to get started"
				showCancel={true}
				modalType="isSignUp"
			/>
			<form
				className="flex flex-col gap-[20px] mb-[35px]"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div>
					<Input
						placeholder="Full Name"
						type="text"
						required
						className={errors.name ? 'border-red-500' : ''}
						{...register('name')}
					/>
				</div>
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
					<Input
						placeholder="Confirm Password"
						type="password"
						showToggle={true}
						required
						className={errors.confirmPassword ? 'border-red-500' : ''}
						{...register('confirmPassword')}
					/>
				</div>
				<div>
					<Button type="submit" className="w-full" disabled={isSubmitting}>
						{isSubmitting ? 'Creating Account...' : 'Sign Up'}
					</Button>
				</div>
				<div className="flex justify-between items-center">
					<Checkbox
						label="I agree to the Terms and Conditions"
						checked={isChecked}
						onChange={(e) => setIsChecked(e.target.checked)}
					/>
				</div>
			</form>
			<p className="mb-[12px] text-[12px] md:text-[14px] text-center">
				Or sign up with
			</p>
			<SocialAuth />
			<p className="text-[10px] md:text-[14px] text-center">
				Already have an account?{' '}
				<span
					className="text-[var(--main-color)] hover:underline cursor-pointer"
					onClick={switchToSignIn}
				>
					Sign in
				</span>
			</p>
		</>
	);
};

export default SignUp;
