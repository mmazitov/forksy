import { Card, CardContent } from '@/shared/components/ui';
import { STATS_ITEMS } from '@/shared/constants';

const Stats = () => {
	return (
		<Card className="from-primary/5 to-accent/5 border-0 bg-gradient-to-r">
			<CardContent className="p-8 md:p-12">
				<ul className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
					{STATS_ITEMS.map((item) => (
						<li key={item.id} className="flex flex-col">
							<strong
								className={`text-4xl leading-none font-bold ${item.color} mb-2`}
							>
								{item.value}
							</strong>
							<span className="text-muted-foreground text-sm">
								{item.label}
							</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};

export default Stats;
