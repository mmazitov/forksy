import { BsCalendar2Month, BsCalendar2Week } from 'react-icons/bs';

import { ScheduleMonth, ScheduleWeek } from '@/features/schedule';
import {
	MetaData,
	PageTitle,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components';
import { PAGE_TITLE } from '@/shared/constants';
import { METADATA_CONFIG } from '@/shared/lib/config';

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
				title={PAGE_TITLE.schedule.title}
				subtitle={PAGE_TITLE.schedule.subtitle}
				buttonVisible={false}
			/>

			<Tabs defaultValue="week" className="space-y-6">
				<TabsList className="grid w-full max-w-md grid-cols-2">
					<TabsTrigger value="week" className="flex gap-1">
						<BsCalendar2Week className="h-4 w-4" />
						Тиждень
					</TabsTrigger>
					<TabsTrigger value="month" className="flex gap-1">
						<BsCalendar2Month className="h-4 w-4" />
						Місяць
					</TabsTrigger>
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
