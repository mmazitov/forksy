import {
	Badge,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	MetaData,
	Separator,
} from '@/components';
import { dish } from '@/mock';
import { LuArrowLeft, LuClock, LuFlame, LuUsers } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';
const DishDetail = () => {
	const { id } = useParams();

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={dish.name}
				description={`${dish.description}`}
				keywords={['recipe', 'dish', 'cooking', dish.name, dish.category]}
				type="article"
			/>
			<Link to="/dishes">
				<Button variant="ghost" className="mb-6 gap-2">
					<LuArrowLeft className="h-4 w-4" />
					Назад до страв
				</Button>
			</Link>

			{/* Header Image */}
			<div className="aspect-[21/9] rounded-2xl overflow-hidden bg-muted mb-8">
				<img
					src={dish.image}
					alt={dish.name}
					className="w-full h-full object-cover"
				/>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					<div>
						<Badge className="mb-3">{dish.category}</Badge>
						<h1 className="text-4xl font-bold text-foreground mb-4">
							{dish.name}
						</h1>
						<p className="text-muted-foreground text-lg">{dish.description}</p>
					</div>

					{/* Quick Stats */}
					<div className="flex flex-wrap gap-6 text-muted-foreground">
						<div className="flex items-center gap-2">
							<LuClock className="h-5 w-5 text-primary" />
							<span>{dish.cookTime} минут</span>
						</div>
						<div className="flex items-center gap-2">
							<LuUsers className="h-5 w-5 text-secondary" />
							<span>{dish.servings} порции</span>
						</div>
						<div className="flex items-center gap-2">
							<LuFlame className="h-5 w-5 text-accent" />
							<span>{dish.calories} ккал</span>
						</div>
					</div>

					<Separator />

					{/* Ingredients */}
					<Card>
						<CardHeader>
							<CardTitle>Інгредієнти</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-3">
								{dish.ingredients.map((ingredient, index) => (
									<li key={index} className="flex justify-between items-center">
										<span className="text-foreground">{ingredient.name}</span>
										<span className="text-muted-foreground font-medium">
											{ingredient.amount}
										</span>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					{/* Instructions */}
					<Card>
						<CardHeader>
							<CardTitle>Приготування</CardTitle>
						</CardHeader>
						<CardContent>
							<ol className="space-y-4">
								{dish.instructions.map((step, index) => (
									<li key={index} className="flex gap-4">
										<span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
											{index + 1}
										</span>
										<p className="text-muted-foreground pt-1">{step}</p>
									</li>
								))}
							</ol>
						</CardContent>
					</Card>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Nutrition */}
					<Card>
						<CardHeader>
							<CardTitle>Поживна цінність</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="text-center p-4 rounded-lg bg-muted">
								<div className="text-3xl font-bold text-primary">
									{dish.calories}
								</div>
								<div className="text-sm text-muted-foreground">Калорії</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Білки</span>
									<span className="font-medium text-secondary">
										{dish.protein}г
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Жири</span>
									<span className="font-medium text-accent">{dish.fat}г</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Вуглеводи</span>
									<span className="font-medium text-primary">
										{dish.carbs}г
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<Button className="w-full" size="lg">
						Додати до плану харчування
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DishDetail;
