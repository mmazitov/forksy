import { Button, Input, Label } from '@/components';
import { useAuth } from '@/lib/auth/AuthContext';
import { modalsConfig } from '@/lib/config';
import { AuthSchema } from '@/lib/utils/schemas/';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLock, LuMail, LuUser } from 'react-icons/lu';
import { z } from 'zod';

const REGISTER_MUTATION = gql`
	mutation Register($email: String!, $password: String!, $name: String) {
		register(email: $email, password: $password, name: $name) {
			token
			user {
				id
				email
				name
			}
		}
	}
`;

const LOGIN_MUTATION = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				id
				email
			}
		}
	}
`;

interface AuthFormProps {
	onOpenChange: (open: boolean) => void;
	isLogin: boolean;
}

type AuthFormData = z.infer<typeof AuthSchema>;

const AuthForm = ({ onOpenChange, isLogin }: AuthFormProps) => {
	const { login } = useAuth();
	const [registerUser, { loading: registerLoading }] =
		useMutation<any>(REGISTER_MUTATION);
	const [loginUser, { loading: loginLoading }] =
		useMutation<any>(LOGIN_MUTATION);

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<AuthFormData>({
		resolver: zodResolver(AuthSchema),
	});

	const onSubmit = async (data: AuthFormData) => {
		try {
			if (isLogin) {
				const { data: loginData } = await loginUser({
					variables: {
						email: data.email,
						password: data.password,
					},
				});
				login(loginData.login.token, loginData.login.user);
			} else {
				const { data: registerData } = await registerUser({
					variables: {
						email: data.email,
						password: data.password,
						name: data.name,
					},
				});
				login(registerData.register.token, registerData.register.user);
			}
			onOpenChange(false);
		} catch (error: any) {
			console.error(error);
			setError('root', {
				message: error.message || 'Something went wrong',
			});
		}
	};

	const iconClass = 'absolute left-3 z-10 top-3 h-4 w-4 text-muted-foreground';
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{!isLogin && (
				<div className="space-y-2">
					<Label htmlFor="name">Ім'я</Label>
					<div className="relative">
						<LuUser className={iconClass} />
						<Input
							id="name"
							type="text"
							{...register('name')}
							placeholder="Введіть ваше ім'я"
							className="pl-10"
						/>
						{errors.name && (
							<div className="pt-1 text-xs text-red-600">
								{errors.name.message}
							</div>
						)}
					</div>
				</div>
			)}

			<div className="space-y-2">
				<Label htmlFor="email">Електронна пошта</Label>
				<div className="relative">
					<LuMail className={iconClass} />
					<Input
						id="email"
						type="email"
						{...register('email')}
						placeholder="example@mail.com"
						className="pl-10"
					/>
					{errors.email && (
						<div className="pt-1 text-xs text-red-600">
							{errors.email.message}
						</div>
					)}
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Пароль</Label>
				<div className="relative">
					<LuLock className={iconClass} />
					<Input
						id="password"
						type="password"
						{...register('password')}
						placeholder="••••••••"
						className="pl-10"
						showToggle
					/>
					{errors.password && (
						<div className="pt-1 text-xs text-red-600">
							{errors.password.message}
						</div>
					)}
				</div>
			</div>

			{errors.root && (
				<div className="text-sm text-red-600 text-center">
					{errors.root.message}
				</div>
			)}

			<Button
				type="submit"
				className="w-full cursor-pointer"
				disabled={isSubmitting || registerLoading || loginLoading}
			>
				{isSubmitting || registerLoading || loginLoading
					? 'Загрузка...'
					: isLogin
						? modalsConfig.AUTH_MODAL.LOGIN.btnText
						: modalsConfig.AUTH_MODAL.REGISTER.btnText}
			</Button>
		</form>
	);
};

export default AuthForm;
