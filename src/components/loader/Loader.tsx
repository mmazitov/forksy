import { Circles } from 'react-loader-spinner';

interface LoaderProps {
	fullScreen?: boolean;
	size?: string;
}

export const Loader = ({ fullScreen = true, size = '80' }: LoaderProps) => {
	if (fullScreen) {
		return (
			<div className="absolute inset-0 z-10 flex h-full items-center justify-center">
				<Circles
					height={size}
					width={size}
					color="hsl(175 60% 50%)"
					ariaLabel="circles-loading"
					wrapperStyle={{}}
					wrapperClass=""
					visible={true}
				/>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center p-8">
			<Circles
				height={size}
				width={size}
				color="hsl(175 60% 50%)"
				ariaLabel="circles-loading"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>
		</div>
	);
};
