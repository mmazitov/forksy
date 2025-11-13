import { Button } from '@/components';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { LuMoon, LuSun } from 'react-icons/lu';

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return (
			<Button variant="ghost" size="icon" className="h-9 w-9">
				<LuSun className="h-4 w-4" />
			</Button>
		);
	}

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			className="h-9 w-9"
		>
			{theme === 'dark' ? (
				<LuSun className="h-4 w-4 transition-all" />
			) : (
				<LuMoon className="h-4 w-4 transition-all" />
			)}
			<span className="sr-only">Переключить тему</span>
		</Button>
	);
};

export default ThemeToggle;
