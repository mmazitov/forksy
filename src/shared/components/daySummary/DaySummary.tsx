import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card';

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
						<div className="text-primary text-2xl font-bold">{calories}</div>
						<div className="text-muted-foreground text-sm">ккал</div>
					</div>
					<div>
						<div className="text-secondary text-2xl font-bold">{dishes}</div>
						<div className="text-muted-foreground text-sm">Блюд</div>
					</div>
					<div>
						<div className="text-accent text-2xl font-bold">0г</div>
						<div className="text-muted-foreground text-sm">Жири</div>
					</div>
					<div>
						<div className="text-primary text-2xl font-bold">0г</div>
						<div className="text-muted-foreground text-sm">Вуглеводи</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default DaySummary;
