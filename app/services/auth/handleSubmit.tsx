import { toast } from '@/hooks/use-toast';
import { signIn } from 'next-auth/react';

interface SignInData {
	email: string;
	password: string;
}

interface SignUpData extends SignInData {
	name: string;
	confirmPassword: string;
}

export const handleSignIn = async (data: SignInData) => {
	try {
		console.log('Submitting sign-in data:', data);
		const response = await fetch('/api/auth/signIn', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to sign in');
		}

		const result = await response.json();
		console.log('Sign-in successful:', result);

		toast({
			title: 'Login Successful',
			description: 'You have successfully logged in.',
		});
		await signIn('credentials', { redirect: false, ...data });
	} catch (error: unknown) {
		console.error('Sign-in error:', error);
		toast({
			title: 'Login Failed',
			description:
				error instanceof Error ? error.message : 'An unknown error occurred',
			variant: 'destructive',
		});
	}
};

export const handleSignUp = async (data: SignUpData) => {
	try {
		console.log('Submitting sign-up data:', data);
		const { confirmPassword, ...userData } = data;

		const response = await fetch('/api/auth/signUp', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(userData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Failed to sign up');
		}

		const result = await response.json();
		console.log('Sign-up successful:', result);
		if (result.token) {
			localStorage.setItem('token', result.token); // или cookies, если нужно
		}
		toast({
			title: 'Registration Successful',
			description: 'You have successfully registered.',
		});
		await signIn('credentials', {
			redirect: false,
			email: data.email,
			password: data.password,
		});
	} catch (error: unknown) {
		console.error('Sign-up error:', error);
		toast({
			title: 'Registration Failed',
			description:
				error instanceof Error ? error.message : 'An unknown error occurred',
			variant: 'destructive',
		});
	}
};
