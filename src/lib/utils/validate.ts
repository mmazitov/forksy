export const phoneValidate = (phone: string): boolean => {
	if (!phone) return false;

	const cleaned = phone.replace(/[^\d+]/g, '');

	const patterns = [/^\+380\d{9}$/, /^380\d{9}$/, /^0\d{9}$/];

	return patterns.some((pattern) => pattern.test(cleaned));
};

export const formatPhone = (phone: string): string => {
	if (!phone) return '';

	let cleaned = phone.replace(/\D/g, '');

	if (cleaned.startsWith('0')) {
		cleaned = '380' + cleaned.slice(1);
	} else if (!cleaned.startsWith('380')) {
		cleaned = '380' + cleaned;
	}

	if (cleaned.length >= 12) {
		return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
	}

	if (cleaned.length >= 10) {
		return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10)}`;
	}
	if (cleaned.length >= 8) {
		return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8)}`;
	}
	if (cleaned.length >= 5) {
		return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5)}`;
	}
	if (cleaned.length >= 3) {
		return `+${cleaned.slice(0, 3)} (${cleaned.slice(3)}`;
	}

	return `+${cleaned}`;
};

export const normalizePhone = (phone: string): string => {
	if (!phone) return '';

	let cleaned = phone.replace(/\D/g, '');

	if (cleaned.startsWith('0')) {
		cleaned = '380' + cleaned.slice(1);
	} else if (!cleaned.startsWith('380')) {
		cleaned = '380' + cleaned;
	}

	return cleaned;
};
