interface ImportMetaEnv {
	readonly VITE_LOGO_HASH: string;
	readonly VITE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv & {
		readonly PROD: boolean;
		readonly DEV: boolean;
	};
}
