import { Button, Input, Label } from '@/components';
import { useAuthActions } from '@/hooks';
import { modalsConfig } from '@/lib/config';
import { useState } from 'react';
import { CiLock, CiMail, CiUser } from 'react-icons/ci';

interface AuthFormProps {
	onOpenChange: (open: boolean) => void;
	isLogin: boolean;
}

const AuthForm = ({ onOpenChange, isLogin }: AuthFormProps) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');

	const { handleLogin } = useAuthActions();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		handleLogin(email, password);
		onOpenChange(false);
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{!isLogin && (
				<div className="space-y-2">
					<Label htmlFor="name">Имя</Label>
					<div className="relative">
						<CiUser className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
						<Input
							id="name"
							type="text"
							placeholder="Введите ваше имя"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="pl-10"
							required
						/>
					</div>
				</div>
			)}

			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<div className="relative">
					<CiMail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						id="email"
						type="email"
						placeholder="example@mail.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="pl-10"
						required
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Пароль</Label>
				<div className="relative">
					<CiLock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						id="password"
						type="password"
						placeholder="••••••••"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="pl-10"
						required
					/>
				</div>
			</div>

			<Button type="submit" className="w-full cursor-pointer">
				{isLogin
					? modalsConfig.AUTH_MODAL.LOGIN.btnText
					: modalsConfig.AUTH_MODAL.REGISTER.btnText}
			</Button>
		</form>
	);
};

export default AuthForm;
