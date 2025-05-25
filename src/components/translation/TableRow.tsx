import { Translations } from '@prisma/client';
import { memo } from 'react';
import { MdEditSquare, MdSave } from 'react-icons/md';

type TranslationRowData = Pick<Translations, 'id' | 'ukrainian' | 'english'>;

interface TableRowProps {
	translation: TranslationRowData;
	isEditing: boolean;
	editData: { ukrainian: string; english: string };
	// eslint-disable-next-line no-unused-vars
	onEdit: (translation: TranslationRowData) => void;
	// eslint-disable-next-line no-unused-vars
	onSave: (id: string) => void;
	// eslint-disable-next-line no-unused-vars
	onChange: (field: 'ukrainian' | 'english', value: string) => void;
}

const TableRow = memo(
	({
		translation: { id, ukrainian, english },
		isEditing,
		editData,
		onEdit,
		onSave,
		onChange,
	}: TableRowProps) => (
		<tr className="hover:bg-[var(--hover-bg)] border-[var(--card-border)] border-b transition-all duration-300">
			<td className="p-[calc(var(--space)/2)] w-[225px] text-[var(--grey-color)]">
				{isEditing ? (
					<input
						type="text"
						value={editData.ukrainian}
						onChange={(e) => onChange('ukrainian', e.target.value)}
						className="bg-transparent border-[var(--grey-color)] focus:border-[var(--foreground)] border-b focus:outline-none w-full"
					/>
				) : (
					<span>{ukrainian}</span>
				)}
			</td>
			<td className="p-[calc(var(--space)/2)] w-[225px] text-[var(--grey-color)]">
				{isEditing ? (
					<input
						type="text"
						value={editData.english}
						onChange={(e) => onChange('english', e.target.value)}
						className="bg-transparent border-[var(--grey-color)] focus:border-[var(--foreground)] border-b focus:outline-none w-full"
					/>
				) : (
					<span>{english}</span>
				)}
			</td>
			<td className="p-[calc(var(--space)/2)] w-[50px] text-[var(--grey-color)]">
				{isEditing ? (
					<MdSave className="cursor-pointer" onClick={() => onSave(id)} />
				) : (
					<MdEditSquare
						className="cursor-pointer"
						onClick={() => onEdit({ id, ukrainian, english })}
					/>
				)}
			</td>
		</tr>
	),
);

TableRow.displayName = 'TableRow';

export default TableRow;
