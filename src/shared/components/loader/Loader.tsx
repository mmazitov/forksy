import { Puff } from 'react-loader-spinner';
import { useTheme } from 'next-themes';
interface LoaderProps {
	fullScreen?: boolean;
	size?: string;
}

export const Loader = ({ fullScreen = true, size = '100' }: LoaderProps) => {
	const { theme } = useTheme();
	const color = theme === 'dark' ? 'hsl(16 68% 55%)' : 'hsl(16 75% 52%)';
	if (fullScreen) {
		return (
			<div className="absolute inset-0 z-10 flex h-full items-center justify-center">
				<Puff
					height={size}
					width={size}
					color={color}
					ariaLabel="puff-loading"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center p-8">
			<Puff
				height={size}
				width={size}
				color={color}
				ariaLabel="puff-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};
