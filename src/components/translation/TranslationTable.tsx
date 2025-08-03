'use client';

import { Translations } from '@prisma/client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
	getTranslations,
	updateTranslation,
} from '@/app/api/translations/actions';
import withAuthClient from '@/lib/hoc/withAuthClient';

import TableRow from './TableRow';

const TranslationTable = () => {
	const [translations, setTranslations] = useState<Translations[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editData, setEditData] = useState({ ukrainian: '', english: '' });

	const fetchTranslations = useCallback(async () => {
		const result = await getTranslations();
		if (result.success && result.translations) {
			setTranslations(result.translations);
		} else {
			setTranslations([]); // Set empty array as fallback
		}
	}, []);

	const handleEdit = useCallback(
		(translation: Pick<Translations, 'id' | 'ukrainian' | 'english'>) => {
			setEditingId(translation.id);
			setEditData({
				ukrainian: translation.ukrainian,
				english: translation.english,
			});
		},
		[],
	);

	const handleSave = useCallback(
		async (id: string) => {
			const result = await updateTranslation(id, editData);
			if (result.success) {
				setEditingId(null);
				fetchTranslations();
			}
		},
		[editData, fetchTranslations],
	);

	const handleChange = useCallback(
		(field: 'ukrainian' | 'english', value: string) => {
			setEditData((prev) => ({ ...prev, [field]: value }));
		},
		[],
	);

	useEffect(() => {
		fetchTranslations();

		const handleTranslationAdded = () => {
			fetchTranslations();
		};

		window.addEventListener('translationAdded', handleTranslationAdded);
		return () => {
			window.removeEventListener('translationAdded', handleTranslationAdded);
		};
	}, [fetchTranslations]);

	const tableRows = useMemo(
		() =>
			translations.map((translation) => (
				<TableRow
					key={translation.id}
					translation={translation}
					isEditing={editingId === translation.id}
					editData={editData}
					onEdit={handleEdit}
					onSave={handleSave}
					onChange={handleChange}
				/>
			)),
		[translations, editingId, editData, handleEdit, handleSave, handleChange],
	);

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
					<tbody>{tableRows}</tbody>
				</table>
			</div>
		</div>
	);
};

export default withAuthClient(TranslationTable);
