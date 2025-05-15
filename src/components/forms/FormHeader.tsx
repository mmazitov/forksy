import CloseButton from '@/components/ui/CloseButton';
import { FormHeaderProps } from '@/lib/types/types';

const FormHeader = ({
	title,
	caption,
	showCancel = false,
	modalType,
}: FormHeaderProps) => {
	return (
		<div className="flex justify-between items-start">
			<div>
				<h2 className="font-bold text-[28px] md:text-[36px] leading-[28px] md:leading-[36px]">
					{title}
				</h2>
				<p className="mb-[35px] text-[12px] md:text-[18px]">{caption}</p>
			</div>
			{showCancel && modalType && (
				<CloseButton modalType={modalType} className="mt-[-35px]" />
			)}
		</div>
	);
};

export default FormHeader;
