interface CounterProps {
	index: number;
}

const Counter = ({ index }: CounterProps) => {
	return (
		<span className="bg-primary text-primary-foreground flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
			{index + 1}
		</span>
	);
};

export { Counter };
