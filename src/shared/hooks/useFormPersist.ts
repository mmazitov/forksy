import { useEffect, useLayoutEffect, useRef } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FormDraftState<T> {
	draft: T | null;
	setDraft: (draft: T | null) => void;
	clearDraft: () => void;
}

const createFormDraftStore = <T>(storageKey: string) => {
	return create<FormDraftState<T>>()(
		persist(
			(set) => ({
				draft: null,
				setDraft: (draft) => set({ draft }),
				clearDraft: () => set({ draft: null }),
			}),
			{
				name: storageKey,
			},
		),
	);
};

const storesCache: Record<
	string,
	ReturnType<typeof createFormDraftStore<unknown>>
> = {};

const getFormStore = <T>(key: string) => {
	if (!storesCache[key]) {
		storesCache[key] = createFormDraftStore<unknown>(key);
	}
	return storesCache[key] as unknown as ReturnType<
		typeof createFormDraftStore<T>
	>;
};

export interface UseFormPersistOptions<T extends FieldValues> {
	storageKey: string;
	form: UseFormReturn<T>;
	disabled?: boolean;
}

export const useFormPersist = <T extends FieldValues>({
	storageKey,
	form,
	disabled = false,
}: UseFormPersistOptions<T>) => {
	const useStore = getFormStore<T>(storageKey);
	const { draft, setDraft, clearDraft } = useStore();

	const { watch, reset, getValues } = form;

	const isRestoring = useRef(true);

	// Intentional run-once: restore draft only on mount to avoid overwriting user edits on re-render.
	useLayoutEffect(() => {
		if (disabled) return;

		if (draft) {
			reset((currentValues) => ({
				...currentValues,
				...draft,
			}));
		}

		queueMicrotask(() => {
			isRestoring.current = false;
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (disabled) return;

		const subscription = watch(() => {
			if (!isRestoring.current) {
				setDraft(getValues() as T);
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, disabled, setDraft, getValues]);

	return {
		clearDraft,
	};
};
