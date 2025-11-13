import { Card, CardContent } from '@/components/ui';
import { STATS_ITEMS } from '@/constants';

const Stats = () => {
	return (
		<Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-0">
			<CardContent className="p-8 md:p-12">
				<ul className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					{STATS_ITEMS.map((item) => (
						<li key={item.id} className="flex flex-col">
							<strong className={`text-4xl font-bold ${item.color} mb-2`}>
								{item.value}
							</strong>
							<span className="text-muted-foreground">{item.label}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default Stats;
