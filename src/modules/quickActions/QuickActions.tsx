import { QUICK_ACTIONS } from '@/constants';
import { Link } from 'react-router-dom';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../components/ui';

const QuickActions = () => {
	return (
		<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{QUICK_ACTIONS.map((action) => (
				<li key={action.title}>
					<Link to={action.link}>
						<Card className="group transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer h-full">
							<CardHeader>
								<div
									className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${action.color}`}
								>
									<action.icon className="h-6 w-6" />
								</div>
								<CardTitle className="text-lg">{action.title}</CardTitle>
								<CardDescription>{action.description}</CardDescription>
							</CardHeader>
						</Card>
					</Link>
				</li>
			))}
		</ul>
	);
};

export default QuickActions;
