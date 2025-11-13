import { IconType } from 'react-icons';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

export interface SocialItem {
	name: string;
	icon: IconType;
}

export const SOCIAL_ITEMS: SocialItem[] = [
	{
		name: 'Google',
		icon: FaGoogle,
	},
	{
		name: 'Facebook',
		icon: FaFacebook,
	},
	{
		name: 'Github',
		icon: FaGithub,
	},
] as const;
