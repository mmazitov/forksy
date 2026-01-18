import { Link } from 'react-router-dom';

import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../../components/ui';

import { QUICK_ACTIONS } from '@/constants';

const QuickActions = () => {
	return (
		<ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{QUICK_ACTIONS.map((action) => (
				<li key={action.title}>
					<Link to={action.link}>
						<Card className="group h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
							<CardHeader>
								<div
									className={`bg-muted mb-3 flex h-12 w-12 items-center justify-center rounded-lg transition-transform group-hover:scale-110 ${action.color}`}
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
