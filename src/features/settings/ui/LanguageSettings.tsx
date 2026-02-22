import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components';

const LanguageSettings = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Мова інтерфейсу</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p>Функціонал зміни мови буде доступний у майбутньому</p>
			</CardContent>
		</Card>
	);
};

export default LanguageSettings;
