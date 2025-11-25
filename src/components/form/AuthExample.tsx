import { AuthForm } from '@/components/form/AuthFormNew';
import { useAuth } from '@/hooks';

/**
 * Приклад використання BetterAuth на фронтенді
 *
 * 1. useAuth() - hook для керування авторизацією
 * 2. AuthForm - компонент реєстрації/входу
 * 3. Захищені маршрути - перевіряють isAuthenticated
 */

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return <div>Завантаження...</div>;
	}

	if (!isAuthenticated) {
		return <AuthForm />;
	}

	return <>{children}</>;
};

export const UserProfile = () => {
	const { user, signOut } = useAuth();

	if (!user) {
		return <AuthForm />;
	}

	return (
		<div className="space-y-4">
			<h1>Профіль користувача</h1>
			<p>
				<strong>Email:</strong> {user.email}
			</p>
			<p>
				<strong>Ім'я:</strong> {user.name || 'Не вказано'}
			</p>
			{user.image && (
				<img
					src={user.image}
					alt={user.name}
					className="w-20 h-20 rounded-full"
				/>
			)}
			<button
				onClick={() => signOut()}
				className="px-4 py-2 bg-red-600 text-white rounded"
			>
				Вихід
			</button>
		</div>
	);
};

/**
 * Інтеграція з GraphQL запитами:
 *
 * Кожен запит на createDish/createProduct тепер має userId:
 *
 * const { mutate } = useCreateDish();
 * await mutate({
 *   name: 'Борщ',
 *   description: 'Укладний борщ',
 *   // ... інші поля
 * });
 *
 * API автоматично використовуватиме userId з сесії
 */
