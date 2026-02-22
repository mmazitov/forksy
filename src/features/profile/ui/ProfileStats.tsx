import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components';

interface ProfileStatsProps {
	dishesCount: number;
	productsCount: number;
	menusCount?: number;
}

const ProfileStats = ({
	dishesCount,
	productsCount,
	menusCount = 0,
}: ProfileStatsProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Статистика</CardTitle>
				<CardDescription>Ваша активність у додатку</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-3 gap-4 text-center">
					<div>
						<div className="text-primary text-2xl font-bold">{dishesCount}</div>
						<div className="text-muted-foreground text-sm">Блюд</div>
					</div>
					<div>
						<div className="text-primary text-2xl font-bold">
							{productsCount}
						</div>
						<div className="text-muted-foreground text-sm">Продуктів</div>
					</div>
					<div>
						<div className="text-primary text-2xl font-bold">{menusCount}</div>
						<div className="text-muted-foreground text-sm">Меню</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default ProfileStats;
