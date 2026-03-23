import { MealTime } from '@/shared/types/api';

export const MEAL_TIME_UI_NAMES: Record<MealTime, string> = {
	[MealTime.Breakfast]: 'Сніданок',
	[MealTime.Lunch]: 'Обід',
	[MealTime.Dinner]: 'Вечеря',
	[MealTime.Snack]: 'Перекус',
} as const;

export const UI_NAME_TO_MEAL_TIME: Record<string, MealTime> = {
	Сніданок: MealTime.Breakfast,
	Обід: MealTime.Lunch,
	Вечеря: MealTime.Dinner,
	Перекус: MealTime.Snack,
} as const;

export const mealTimeToUI = (mealTime: MealTime): string => {
	return MEAL_TIME_UI_NAMES[mealTime] || mealTime;
};

export const uiToMealTime = (uiName: string): MealTime => {
	return UI_NAME_TO_MEAL_TIME[uiName] || (uiName as MealTime);
};
