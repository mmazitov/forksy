'use client';

import { Translations } from '@prisma/client';
import { useEffect, useState } from 'react';
import { MdEditSquare, MdSave } from 'react-icons/md';

import {
	getTranslations,
	updateTranslation,
} from '@/app/api/translations/actions';
import withAuthClient from '@/lib/hoc/withAuthClient';

const TranslationTable = () => {
	const [translations, setTranslations] = useState<Translations[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editData, setEditData] = useState({ ukrainian: '', english: '' });

	const fetchTranslations = async () => {
		const result = await getTranslations();
		if (result.success && result.translations) {
			setTranslations(result.translations);
		} else {
			setTranslations([]); // Set empty array as fallback
		}
	};

	const handleEdit = (translation: Translations) => {
		setEditingId(translation.id);
		setEditData({
			ukrainian: translation.ukrainian,
			english: translation.english,
		});
	};

	const handleSave = async (id: string) => {
		const result = await updateTranslation(id, editData);
		if (result.success) {
			setEditingId(null);
			fetchTranslations();
		}
	};

	const handleChange = (field: 'ukrainian' | 'english', value: string) => {
		setEditData((prev) => ({ ...prev, [field]: value }));
	};

	useEffect(() => {
		fetchTranslations();

		const handleTranslationAdded = () => {
			fetchTranslations();
		};

		window.addEventListener('translationAdded', handleTranslationAdded);
		return () => {
			window.removeEventListener('translationAdded', handleTranslationAdded);
		};
	}, []);

	return (
		<div className="relative flex flex-col h-[500px]">
			<div className="bg-[var(--input-bg)] rounded-t-[var(--radius)]">
				<table className="w-full border-collapse">
					<thead>
						<tr className="border-[var(--card-border)] border-b">
							<th className="top-0 sticky px-[calc(var(--space)/2)] py-[var(--space)] w-[225px] text-[var(--foreground)] text-left">
								Назва українською
							</th>
							<th className="top-0 sticky py-[var(--space)] w-[225px] text-[var(--foreground)] text-left">
								Назва англійською
							</th>
							<th className="top-0 sticky py-[var(--space)] w-[55px] text-[var(--foreground)] text-left">
								Дії
							</th>
						</tr>
					</thead>
				</table>
			</div>

			<div className="flex-1 bg-[var(--input-bg)] rounded-b-[var(--radius)] overflow-y-auto">
				<table className="w-full border-collapse">
					<tbody>
						{translations.map((translation) => (
							<tr
								key={translation.id}
								className="hover:bg-[var(--hover-bg)] border-[var(--card-border)] border-b transition-all duration-300"
							>
								<td className="p-[calc(var(--space)/2)] w-[225px] text-[var(--grey-color)]">
									{editingId === translation.id ? (
										<input
											type="text"
											value={editData.ukrainian}
											onChange={(e) =>
												handleChange('ukrainian', e.target.value)
											}
											className="bg-transparent border-[var(--grey-color)] focus:border-[var(--foreground)] border-b focus:outline-none w-full"
										/>
									) : (
										<span>{translation.ukrainian}</span>
									)}
								</td>
								<td className="p-[calc(var(--space)/2)] w-[225px] text-[var(--grey-color)]">
									{editingId === translation.id ? (
										<input
											type="text"
											value={editData.english}
											onChange={(e) => handleChange('english', e.target.value)}
											className="bg-transparent border-[var(--grey-color)] focus:border-[var(--foreground)] border-b focus:outline-none w-full"
										/>
									) : (
										<span>{translation.english}</span>
									)}
								</td>
								<td className="p-[calc(var(--space)/2)] w-[50px] text-[var(--grey-color)]">
									{editingId === translation.id ? (
										<MdSave
											className="cursor-pointer"
											onClick={() => handleSave(translation.id)}
										/>
									) : (
										<MdEditSquare
											className="cursor-pointer"
											onClick={() => handleEdit(translation)}
										/>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default withAuthClient(TranslationTable);
