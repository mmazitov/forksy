import { Button } from '@/components/ui';
import { today } from '@/lib/utils';
import { LuCalendar, LuChefHat, LuPlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';
const Hero = () => {
	return (
		<div className="container mx-auto px-4 py-16 md:py-24">
			<div className="max-w-3xl animate-fade-in">
				<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm text-primary mb-6">
					<LuCalendar className="h-4 w-4" />
					<span className="capitalize">{today}</span>
				</div>

				<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
					Плануйте меню з легкістю
				</h1>

				<p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
					Створюйте персоналізовані плани харчування, знаходьте смачні рецепти
					та керуйте своїм раціоном ефективно.
				</p>

				<div className="flex flex-wrap gap-4">
					<Link to="/menu-planner">
						<Button size="lg" className="gap-2">
							<LuPlus className="h-5 w-5" />
							Створити меню
						</Button>
					</Link>
					<Link to="/dishes">
						<Button size="lg" variant="outline" className="gap-2">
							<LuChefHat className="h-5 w-5" />
							Переглянути рецепти
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Hero;
