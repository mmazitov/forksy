import TranslationAddForm from '@/components/forms/TranslationAddForm';
import TranslationTable from '@/components/translation/TranslationTable';

export const metadata = {
	title: 'Переклади',
	description: 'Перегляд та додавання перекладів',
};

const TranslationPage = async () => {
	return (
		<div className="py-[var(--space)]">
			<div className="flex md:flex-row flex-col gap-[var(--space)] m-auto max-w-[820px]">
				<div className="flex flex-col gap-2">
					<h3 className="font-semibold text-lg">Додати переклад</h3>
					<p>Заповніть поля для нового перекладу</p>
					<TranslationAddForm />
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="font-semibold text-lg">Список доступних перекладів</h3>
					<TranslationTable />
				</div>
			</div>
		</div>
	);
};

export default TranslationPage;
