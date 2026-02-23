import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { LuLock, LuMail, LuUser } from 'react-icons/lu';
import { z } from 'zod';

import { useAuthForm } from '../hooks/useAuthForm';

import { Button, Checkbox, Input, Label } from '@/shared/components';
import { modalsConfig } from '@/shared/lib/config';
import { LoginSchema, RegisterSchema } from '@/shared/lib/utils/schemas/';

interface AuthFormProps {
	onOpenChange: (open: boolean) => void;
	isLogin: boolean;
}

type LoginFormData = z.infer<typeof LoginSchema>;
type RegisterFormData = z.infer<typeof RegisterSchema>;
type AuthFormData = LoginFormData | RegisterFormData;

const AuthForm = ({ onOpenChange, isLogin }: AuthFormProps) => {
	const { handleLogin, handleRegister, isLoading } = useAuthForm();

	const schema = isLogin ? LoginSchema : RegisterSchema;

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<AuthFormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			rememberMe: true,
		},
	});

	const onSubmit = async (data: AuthFormData) => {
		const success = isLogin
			? await handleLogin(data as LoginFormData)
			: await handleRegister(data as RegisterFormData);

		if (success) {
			onOpenChange(false);
		}
	};

	const handleFormSubmit = handleSubmit(onSubmit);

	const iconClass = 'absolute left-3 z-10 top-3 h-4 w-4 text-muted-foreground';
	return (
		<form onSubmit={handleFormSubmit} className="space-y-4">
			{!isLogin && (
				<div className="space-y-2">
					<Label htmlFor="name">Ім&aposя</Label>
					<div className="relative">
						<LuUser className={iconClass} />
						<Input
							id="name"
							type="text"
							{...register('name')}
							placeholder="Введіть ваше ім'я"
							className="pl-10"
						/>
						{'name' in errors && errors.name && (
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

			<div className="flex items-center space-x-2">
				<Controller
					name="rememberMe"
					control={control}
					render={({ field }) => (
						<Checkbox
							id="rememberMe"
							checked={field.value as boolean}
							onCheckedChange={field.onChange}
						/>
					)}
				/>
				<label
					htmlFor="rememberMe"
					className="cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					Запам&apos;ятати мене
				</label>
			</div>

			<Button
				type="submit"
				className="w-full cursor-pointer"
				disabled={isSubmitting || isLoading}
			>
				{isSubmitting || isLoading
					? 'Загрузка...'
					: isLogin
						? modalsConfig.AUTH_MODAL.LOGIN.btnText
						: modalsConfig.AUTH_MODAL.REGISTER.btnText}
			</Button>
		</form>
	);
};

export default AuthForm;
