'use client';

import { HandySvg } from 'handy-svg';
import Link from 'next/link';

import logoSrc from '../../../public/logo.svg';

const Logo = () => {
	return (
		<Link href="/">
			<HandySvg
				src={typeof logoSrc === 'string' ? logoSrc : logoSrc.src}
				className="icon"
				width="100"
				height="100"
			/>
		</Link>
	);
};

export default Logo;
