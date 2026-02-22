import {
	DietaryPreferences,
	PersonalInfo,
	ProfileStats,
	useProfile,
} from '@/features/profile';
import { Button, MetaData, PageTitle } from '@/shared/components';
import { PAGE_TITLE } from '@/shared/constants';
import { METADATA_CONFIG } from '@/shared/lib/config';

const Profile = () => {
	const {
		user,
		formData,
		isEditMode,
		updating,
		handleEdit,
		handleCancel,
		handleSave,
		updateFormData,
	} = useProfile();

	return (
		<main className="container mx-auto px-4 py-8">
			<div className="mx-auto max-w-2xl space-y-6">
				<MetaData
					title={METADATA_CONFIG.titles.profile}
					description={METADATA_CONFIG.descriptions.profile}
					keywords={METADATA_CONFIG.keywords.profile}
					type="website"
				/>
				<PageTitle
					title={PAGE_TITLE.profile.title}
					subtitle={PAGE_TITLE.profile.subtitle}
					buttonVisible={false}
				/>

				<PersonalInfo
					user={user}
					formData={formData}
					isEditMode={isEditMode}
					onEdit={handleEdit}
					onUpdate={updateFormData}
				/>

				<DietaryPreferences
					user={user}
					formData={formData}
					isEditMode={isEditMode}
					onUpdate={updateFormData}
				/>

				<ProfileStats
					dishesCount={user?.dishesCount ?? 0}
					productsCount={user?.productsCount ?? 0}
				/>

				<div className="flex justify-end gap-2">
					{isEditMode && (
						<>
							<Button
								variant="outline"
								onClick={handleCancel}
								disabled={updating}
							>
								Скасувати
							</Button>
							<Button onClick={handleSave} disabled={updating}>
								{updating ? 'Збереження...' : 'Зберегти'}
							</Button>
						</>
					)}
				</div>
			</div>
		</main>
	);
};

export default Profile;
