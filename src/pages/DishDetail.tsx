import { LuArrowLeft, LuClock, LuFlame, LuUsers } from 'react-icons/lu';
import { Link, useParams } from 'react-router-dom';

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
const DishDetail = () => {
	const { id } = useParams();

	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={dish.name}
				description={dish.description}
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
			<div className="bg-muted mb-8 aspect-21/9 overflow-hidden rounded-2xl">
				<img
					src={dish.image}
					alt={dish.name}
					className="h-full w-full object-cover"
				/>
			</div>

			<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
				{/* Main Content */}
				<div className="space-y-6 lg:col-span-2">
					<div>
						<Badge className="mb-3">{dish.category}</Badge>
						<h1 className="text-foreground mb-4 text-4xl font-bold">
							{dish.name}
						</h1>
						<p className="text-muted-foreground text-lg">{dish.description}</p>
					</div>

					{/* Quick Stats */}
					<div className="text-muted-foreground flex flex-wrap gap-6">
						<div className="flex items-center gap-2">
							<LuClock className="text-primary h-5 w-5" />
							<span>{dish.cookTime} минут</span>
						</div>
						<div className="flex items-center gap-2">
							<LuUsers className="text-secondary h-5 w-5" />
							<span>{dish.servings} порции</span>
						</div>
						<div className="flex items-center gap-2">
							<LuFlame className="text-accent h-5 w-5" />
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
									<li key={index} className="flex items-center justify-between">
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
										<span className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
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
							<div className="bg-muted rounded-lg p-4 text-center">
								<div className="text-primary text-3xl font-bold">
									{dish.calories}
								</div>
								<div className="text-muted-foreground text-sm">Калорії</div>
							</div>

							<Separator />

							<div className="space-y-3">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Білки</span>
									<span className="text-secondary font-medium">
										{dish.protein}г
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Жири</span>
									<span className="text-accent font-medium">{dish.fat}г</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Вуглеводи</span>
									<span className="text-primary font-medium">
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
