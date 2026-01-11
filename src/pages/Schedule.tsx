import {
	MetaData,
	PageTitle,
	ScheduleMonth,
	ScheduleWeek,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/components';
import { METADATA_CONFIG } from '@/lib/config';

const Schedule = () => {
	return (
		<div className="container mx-auto px-4 py-8">
			<MetaData
				title={METADATA_CONFIG.titles.schedule}
				description={METADATA_CONFIG.descriptions.schedule}
				keywords={METADATA_CONFIG.keywords.schedule}
				type="website"
			/>
			<PageTitle
				title="Розклад харчування"
				subtitle="Плануйте і відстежуйте прийоми їжі"
				buttonVisible={false}
			/>

			<Tabs defaultValue="week" className="space-y-6">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="week">Тиждень</TabsTrigger>
					<TabsTrigger value="month">Місяць</TabsTrigger>
				</TabsList>

				<TabsContent value="week" className="space-y-6">
					<ScheduleWeek />
				</TabsContent>

				<TabsContent value="month" className="space-y-6">
					<ScheduleMonth />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Schedule;
