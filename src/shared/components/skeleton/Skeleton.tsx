import { Card, CardContent, CardFooter, SkeletonBody } from '../ui';

const Skeleton = () => {
	return (
		<Card className="flex h-full flex-col justify-between gap-2 overflow-hidden">
			<CardContent className="flex flex-col gap-2 p-0">
				<SkeletonBody className="h-48 w-full rounded-b-none" />
				<div className="flex flex-col gap-1 p-4 pt-2 pb-0">
					<SkeletonBody className="h-6 w-3/4" />
					<SkeletonBody className="h-4 w-1/4" />
					<SkeletonBody className="mt-2 h-4 w-full" />
					<SkeletonBody className="h-4 w-5/6" />
				</div>
			</CardContent>
			<CardFooter className="flex gap-2 px-4 pb-4">
				<SkeletonBody className="h-5 w-16" />
				<SkeletonBody className="h-5 w-16" />
			</CardFooter>
		</Card>
	);
};

export default Skeleton;
