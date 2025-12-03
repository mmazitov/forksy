import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components';
import { LogOut, Settings, User, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
	isLoggedIn: boolean;
	userName?: string;
	onLogout: () => void;
	onOpenAuth: () => void;
	isLoading?: boolean;
}

const UserMenu = ({
	isLoggedIn,
	userName,
	onLogout,
	onOpenAuth,
	isLoading = false,
}: UserMenuProps) => {
	const navigate = useNavigate();

	if (isLoading) {
		return (
			<Button variant="outline" size="sm" disabled className="gap-2">
				<div className="h-4 w-4 bg-muted rounded animate-pulse" />
				<span className="hidden sm:inline w-16 h-4 bg-muted rounded animate-pulse" />
			</Button>
		);
	}

	if (!isLoggedIn) {
		return (
			<Button onClick={onOpenAuth} size="sm" className="gap-2">
				<User className="h-4 w-4" />
				Вхід
			</Button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="gap-2">
					<UserCircle className="h-4 w-4" />
					<span className="hidden sm:inline">{userName || 'Користувач'}</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel>Аккаунт</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => navigate('/profile')}
					className="cursor-pointer"
				>
					<Settings className="mr-2 h-4 w-4" />
					Персональний кабінет
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => navigate('/settings')}
					className="cursor-pointer"
				>
					<Settings className="mr-2 h-4 w-4" />
					Налаштування
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={onLogout}
					className="cursor-pointer text-destructive"
				>
					<LogOut className="mr-2 h-4 w-4" />
					Вийти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserMenu;
