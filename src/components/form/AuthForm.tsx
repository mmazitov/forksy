import { Button, Input, Label } from '@/components';
import { useAuth } from '@/hooks';
import { modalsConfig } from '@/lib/config';
import { useLoginMutation, useRegisterMutation } from '@/lib/graphql';
import { LoginSchema, RegisterSchema } from '@/lib/utils/schemas/';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuLock, LuMail, LuUser } from 'react-icons/lu';
import { z } from 'zod';

interface AuthFormProps {
	onOpenChange: (open: boolean) => void;
	isLogin: boolean;
}

type LoginFormData = z.infer<typeof LoginSchema>;
type RegisterFormData = z.infer<typeof RegisterSchema>;
type AuthFormData = LoginFormData | RegisterFormData;

const AuthForm = ({ onOpenChange, isLogin }: AuthFormProps) => {
	const { login } = useAuth();
	const [registerUser, { loading: registerLoading }] = useRegisterMutation();
	const [loginUser, { loading: loginLoading }] = useLoginMutation();

	const schema = isLogin ? LoginSchema : RegisterSchema;

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors, isSubmitting },
	} = useForm<AuthFormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: any) => {
		try {
			if (isLogin) {
				const result = await loginUser({
					variables: {
						email: data.email,
						password: data.password,
					},
				});
				if (!result.data?.login) {
					throw new Error('No login data returned');
				}
				login(result.data.login.token, result.data.login.user);
			} else {
				const result = await registerUser({
					variables: {
						email: data.email,
						password: data.password,
						name: (data as RegisterFormData).name,
					},
				});
				if (!result.data?.register) {
					throw new Error('No register data returned');
				}
				login(result.data.register.token, result.data.register.user);
			}
			onOpenChange(false);
		} catch (error: any) {
			setError('root', {
				message: error.message || 'Something went wrong',
			});
		}
	};

	const handleFormSubmit = handleSubmit(onSubmit);

	const iconClass = 'absolute left-3 z-10 top-3 h-4 w-4 text-muted-foreground';
	return (
		<form onSubmit={handleFormSubmit} className="space-y-4">
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
						{(errors as any).name && (
							<div className="pt-1 text-xs text-red-600">
								{(errors as any).name.message}
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
