import { CheckboxProps } from '@/lib/types/types';

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => {
	return (
		<>
			<label className="flex items-center cursor-pointer select-none">
				<input
					type="checkbox"
					checked={checked}
					onChange={onChange}
					className="hidden"
				/>
				<span
					className={`relative rounded-[var(--radius-sm)] w-[16px] h-[16px] flex items-center justify-center bg-[var(--main-color)]`}
				>
					{checked && (
						<svg
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className="text-[var(--btn-color)]"
						>
							<path
								d="M10 3L4.5 8.5L2 6"
								stroke="var(--btn-color)"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</span>
				{label && (
					<span className="ml-[4px] text-[10px] md:text-[14px]">{label}</span>
				)}
			</label>
		</>
	);
};

export default Checkbox;
