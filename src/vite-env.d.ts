interface ImportMetaEnv {
	readonly VITE_LOGO_HASH: string;
	readonly VITE_API_URL: string;
	readonly VITE_API_BASE_URL?: string;
	readonly VITE_SITE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv & {
		readonly PROD: boolean;
		readonly DEV: boolean;
	};
}
