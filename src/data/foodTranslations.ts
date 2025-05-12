export const foodTranslations: { [key: string]: string } = {
	яблуко: 'apple',
	молоко: 'milk',
	хліб: 'bread',
	риба: 'fish',
	курка: 'chicken',
	яйце: 'egg',
	картопля: 'potato',
	морква: 'carrot',
	банан: 'banana',
	помідор: 'tomato',
	огірок: 'cucumber',
	сир: 'cheese',
	"м'ясо": 'meat',
	рис: 'rice',
	цибуля: 'onion',
};

export const findEnglishName = (ukrainianName: string): string => {
	const normalized = ukrainianName.toLowerCase().trim();
	return foodTranslations[normalized] || normalized;
};
