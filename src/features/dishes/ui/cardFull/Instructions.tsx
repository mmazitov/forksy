import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Counter,
} from '@/shared/components';

interface InstructionsProps {
	instructions: string[];
}

const Instructions = ({ instructions }: InstructionsProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Приготування</CardTitle>
			</CardHeader>
			<CardContent>
				<ol className="space-y-4">
					{instructions.map((step, index) => (
						<li key={index} className="flex gap-4">
							<Counter index={index} />
							<p className="text-muted-foreground pt-1">{step}</p>
						</li>
					))}
				</ol>
			</CardContent>
		</Card>
	);
};

export default Instructions;
