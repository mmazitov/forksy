import { Card, CardContent, CardHeader, CardTitle } from '../ui';

interface DaySummaryProps {
	selectedDay: string;
	calories: number;
	dishes: number;
}

const DaySummary = ({ selectedDay, calories, dishes }: DaySummaryProps) => {
	return (
		<Card className="mt-6">
			<CardHeader>
				<CardTitle>Всього за {selectedDay}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
					<div>
						<div className="text-2xl font-bold text-primary">{calories}</div>
						<div className="text-sm text-muted-foreground">ккал</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-secondary">{dishes}</div>
						<div className="text-sm text-muted-foreground">Блюд</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-accent">0г</div>
						<div className="text-sm text-muted-foreground">Жири</div>
					</div>
					<div>
						<div className="text-2xl font-bold text-primary">0г</div>
						<div className="text-sm text-muted-foreground">Вуглеводи</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default DaySummary;
