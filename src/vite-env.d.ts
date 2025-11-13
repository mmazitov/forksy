interface ImportMetaEnv {
	readonly VITE_LOGO_HASH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv & {
		readonly PROD: boolean;
		readonly DEV: boolean;
	};
}
