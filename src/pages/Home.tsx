import {
	FeaturedDishes,
	Hero,
	MetaData,
	QuickActions,
	Stats,
} from '@/components';
import { METADATA_CONFIG } from '@/lib/config';

const Home = () => {
	return (
		<>
			<MetaData
				title={METADATA_CONFIG.titles.home}
				description={METADATA_CONFIG.descriptions.home}
				keywords={METADATA_CONFIG.keywords.home}
				type="website"
			/>
			{/* Hero Section */}
			<section
				className="relative overflow-hidden"
				style={{ background: 'var(--gradient-hero)' }}
			>
				<Hero />
			</section>

			{/* Quick Actions */}
			<section className="container mx-auto px-4 py-12 md:py-16">
				<QuickActions />
			</section>

			{/* Featured Dishes */}
			<section className="container mx-auto px-4 py-12 md:py-16">
				<FeaturedDishes />
			</section>

			{/* Stats Section */}
			<section className="container mx-auto px-4 py-12 md:py-16">
				<Stats />
			</section>
		</>
	);
};

export default Home;
