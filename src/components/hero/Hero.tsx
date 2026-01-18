import { LuCalendar, LuChefHat, LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { today } from '@/lib/utils';

const HERO_BUTTONS = [
	{
		to: '/menu-planner',
		icon: <LuPlus className="h-5 w-5" />,
		label: 'Створити меню',
		variant: 'default' as const,
	},
	{
		to: '/dishes',
		icon: <LuChefHat className="h-5 w-5" />,
		label: 'Переглянути рецепти',
		variant: 'outline' as const,
	},
];

const Hero = () => {
	return (
		<div className="container mx-auto px-4 py-16 md:py-24">
			<div className="animate-fade-in max-w-3xl">
				<div className="bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
					<LuCalendar className="h-4 w-4" />
					<span className="capitalize">{today}</span>
				</div>

				<h1 className="text-foreground mb-6 text-4xl leading-tight font-bold md:text-6xl">
					Плануйте меню з легкістю
				</h1>

				<p className="text-muted-foreground mb-8 max-w-2xl text-lg md:text-xl">
					Створюйте персоналізовані плани харчування, знаходьте смачні рецепти
					та керуйте своїм раціоном ефективно.
				</p>

				<div className="flex flex-wrap gap-4">
					{HERO_BUTTONS.map(({ to, icon, label, variant }) => (
						<Link key={to} to={to}>
							<Button size="lg" variant={variant} className="gap-2">
								{icon}
								{label}
							</Button>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hero;
