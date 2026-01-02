import { IconType } from 'react-icons';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

export interface SocialItem {
	name: string;
	icon: IconType;
}

export const SOCIAL_ITEMS: SocialItem[] = [
	{
		name: 'google',
		icon: FaGoogle,
	},
	{
		name: 'facebook',
		icon: FaFacebook,
	},
	{
		name: 'github',
		icon: FaGithub,
	},
] as const;
