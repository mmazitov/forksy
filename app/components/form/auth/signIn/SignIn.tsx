'use client';

import { FormProvider, useForm } from 'react-hook-form';

import FormButton from '@/app/components/form/formComponents/FormButton';
import FormInput from '@/app/components/form/formComponents/FormInput';
import { authSchema } from '@/app/lib/validateSchema';
import { handleSignIn } from '@/app/services/auth/handleSubmit';
import { handleValidationErrors } from '@/app/services/validation/handleValidationErrors';
import { useToast } from '@/hooks/use-toast';
import { Fieldset } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { z } from 'zod';

type AuthFormData = z.infer<typeof authSchema>;

const SignIn = ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => {
	const router = useRouter();
	const methods = useForm<AuthFormData>({ resolver: zodResolver(authSchema) });
	const { toast } = useToast();

	const onSubmit = async (data: AuthFormData) => {
		await handleSignIn(data);
		onSubmitSuccess();
		router.push('/pages/profile');
	};

	const handleErrorToast = () => {
		handleValidationErrors(methods.formState.errors);
	};

	return (
		<FormProvider {...methods}>
			<Fieldset
				className="gap-5 grid mt-3"
				onSubmit={methods.handleSubmit(onSubmit, handleErrorToast)}
			>
				<FormInput
					label="email"
					id="email"
					type="email"
					errorMessage="Email required"
				/>
				<FormInput
					label="password"
					id="password"
					type="password"
					errorMessage="Password required"
				/>
				<FormButton value="Sign in" />
			</Fieldset>
		</FormProvider>
	);
};

export default SignIn;
