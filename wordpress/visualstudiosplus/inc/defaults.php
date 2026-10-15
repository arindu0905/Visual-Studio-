<?php
/**
 * Default content — a straight port of the Next.js `src/data/*` files.
 *
 * These are used to seed the editable post types on theme activation, and as a
 * fallback whenever a post type has no entries, so the site never renders empty.
 *
 * @package VisualStudiosPlus
 */

defined( 'ABSPATH' ) || exit;

/** URL of a file shipped in the theme's media folder. */
function vsp_asset( $file ) {
	if ( preg_match( '#^https?://#', $file ) ) {
		return $file;
	}
	$base = apply_filters( 'vsp_asset_base', get_template_directory_uri() . '/assets/media' );
	return trailingslashit( $base ) . ltrim( $file, '/' );
}

function vsp_youtube_thumb( $id ) {
	return 'https://i.ytimg.com/vi/' . rawurlencode( $id ) . '/maxresdefault.jpg';
}

function vsp_default_site() {
	return array(
		'name'        => 'Visual Studios Plus',
		'short_name'  => 'Visual Studios +',
		'tagline'     => 'We create content meant to be experienced. Not simply consumed.',
		'eyebrow'     => 'Visual Studios+ · Creative Agency',
		'intro'       => 'Colombo’s premier digital marketing, social media campaigns, and content creation agency. We partner with ambitious brands to command attention and deliver verified commercial growth.',
		'headline'    => array(
			'lead'     => 'We create content',
			'rotating' => array( 'that moves' ),
			'tail'     => 'brands.',
		),
		'description' => 'Visual Studios Plus is a Colombo-based content creation and curation digital marketing agency — photography, videography, social, paid media, CGI and branding strategy.',
		'about'       => array(
			'statement' => 'Premier content creation and curation agency based in Colombo.',
			'body'      => 'Visual Studios Plus has earned an industry-leading reputation for exceptional work in commercial videography, advertising photography, and social viral content creation, specializing in competitive consumer sectors such as FMCG, Food & Beverage, Fashion, and Luxury Hospitality.',
		),
		'videography' => array(
			'statement' => 'Cinema-grade visual storytelling engineered to stop the infinite scroll and command cultural attention.',
			'manifesto' => array( 'We create.', 'We strategize.', 'We execute.', 'We amplify.', 'We measure.', 'We grow.' ),
		),
		'contact'     => array(
			'email'   => 'info@visualstudiosplus.com',
			'phones'  => array( '+94 74 043 6639', '+94 74 043 5332' ),
			'address' => array( 'Level 1, 36 Haig Road', 'Colombo 04', 'Sri Lanka' ),
		),
		'media'       => array(
			'logo'          => vsp_asset( 'VSP-Square-logo.png' ),
			'showreel'      => vsp_asset( 'Sequence-01.mp4' ),
			'showreel_loop' => array( 63, 80 ),
			'poster'        => vsp_asset( 'Cover.jpeg' ),
		),
	);
}

/** Label => default URL. Empty URLs are hidden until filled in the Customizer. */
function vsp_default_socials() {
	return array(
		'youtube'   => array( 'YouTube', 'https://www.youtube.com/@visualstudiosplus' ),
		'instagram' => array( 'Instagram', 'https://instagram.com/visualstudiosplus' ),
		'linkedin'  => array( 'LinkedIn', 'https://linkedin.com/company/visualstudiosplus' ),
		'behance'   => array( 'Behance', 'https://behance.net/visualstudiosplus' ),
		'facebook'  => array( 'Facebook', 'https://www.facebook.com/visualstudiosplus/' ),
		'pinterest' => array( 'Pinterest', '' ),
		'x'         => array( 'X', '' ),
	);
}

function vsp_default_projects() {
	return array(
		array(
			'slug'        => 'regal-reseau-hotel',
			'title'       => 'Regal Reseau Hotel',
			'client'      => 'Regal Reseau',
			'category'    => 'Hospitality Film',
			'summary'     => 'A visual journey of the unique experiences Regal Reseau has to offer for anyone staying on board.',
			'youtube_id'  => 'rg63iEBbCVU',
			'cover_alt'   => 'Close-up portrait from the Regal Reseau Hotel film',
			'letterboxed' => true,
		),
		array(
			'slug'        => 'itc-rathnadeepa-peter-kuruvita',
			'title'       => 'ITC Rathnadeepa × Peter Kuruvita',
			'client'      => 'ITC Ratnadipa',
			'category'    => 'Food Film · Trailer',
			'summary'     => 'Using storytelling in our food videography to reflect on ITC’s brand focus on sustainability and responsible sourcing.',
			'youtube_id'  => 'd-_dQ9-LmxE',
			'cover_alt'   => 'Chef Peter Kuruvita smiling in a restaurant kitchen',
			'letterboxed' => false,
		),
		array(
			'slug'        => 'exclusive-lines-launch',
			'title'       => 'Exclusive Lines',
			'client'      => 'Exclusive Lines',
			'category'    => 'Product Launch Campaign',
			'summary'     => 'A video campaign to highlight the launch of the new Exclusive Lines website.',
			'youtube_id'  => 'Nv1hYJFlshM',
			'cover_alt'   => 'Model applying fragrance in a bright kitchen, from the Exclusive Lines launch film',
			'letterboxed' => false,
		),
		array(
			'slug'        => 'pussalawa-hotel',
			'title'       => 'Pussalawa Hotel',
			'client'      => 'Pussalawa',
			'category'    => 'Corporate Film',
			'summary'     => 'Corporate videography showcasing the process of Pussalawa Farms in action.',
			'youtube_id'  => 'ZX7DkXlNgmk',
			'cover_alt'   => 'Aerial view of the Pussalawa hotel surrounded by forest',
			'letterboxed' => true,
		),
	);
}

function vsp_default_services() {
	$s = function ( $slug, $title, $summary, $scope, $image, $alt, $link = '' ) {
		return array( 'slug' => $slug, 'title' => $title, 'summary' => $summary, 'scope' => $scope, 'image' => $image, 'image_alt' => $alt, 'link' => $link );
	};
	return array(
		$s( 'strategy', 'Strategy', 'Consumer insights, competitive differentiation, and growth funnels.', array( 'Audience Persona Mapping', 'Platform Cadence Strategy', 'Brand Positioning Architecture' ), '7.webp', 'Fashion editorial photograph of three models on a white terrace' ),
		$s( 'social-media', 'Social Media', 'End-to-end management, daily momentum, and community nurturing.', array( 'Weekly Editorial Calendars', 'Community Growth & Engagement', 'Social Listening & Trend Hacking' ), 'Tiesh-7077-1.webp', 'Fashion portrait photographed by Visual Studios Plus' ),
		$s( 'digital-campaigns', 'Digital Campaigns', '360° viral launches built for record-breaking market recall.', array( 'Launch Teaser-to-Convert Funnels', 'Influencer Intercept Strategy', 'Multi-Platform Ad Variations' ), 'https://i.ytimg.com/vi/Nv1hYJFlshM/maxresdefault.jpg', 'Still from the Exclusive Lines product launch campaign film' ),
		$s( 'content-creation', 'Content Creation', 'Fast-turnaround studio assets that turn scrollers into buyers.', array( 'Sensory Macro Filmmaking', 'Real-Time Event Drops', 'Product Still Life Styling' ), 'KeelesFoodPhotography0403.webp', 'Food photography by Visual Studios Plus' ),
		$s( 'photography', 'Photography', 'Tactile luxury across Gastronomy, Architecture, and High Fashion.', array( 'Culinary Food & Beverage Styling', 'Luxury Hospitality & Interiors', 'High Jewellery & Diamond Lighting' ), 'KeelesFoodPhotography0314.webp', 'Overhead food photography of a Sri Lankan crab curry spread', '/photography/' ),
		$s( 'videography', 'Videography', 'Cinema cameras, director direction, and broadcast post-production.', array( '4K/6K Cinema Master Delivery', 'DaVinci Resolve Color Grading', 'Original Sound Scoring & SFX' ), 'https://i.ytimg.com/vi/d-_dQ9-LmxE/maxresdefault.jpg', 'Chef on set during the ITC Rathnadeepa Peter Kuruvita trailer shoot', '/work/' ),
		$s( 'branding', 'Branding', 'Packaging, label architecture, and comprehensive brand guidelines.', array( 'Logotype & Monogram Systems', 'FMCG Can & Bottle Dielines', 'Visual Identity Architecture' ), 'DSC_1657-2.webp', 'Jewellery campaign portrait of a model wearing a ruby ring' ),
		$s( 'tvc-commercials', 'TVC / Commercials', 'National broadcast commercials and digital high-speed spots.', array( 'Scriptwriting & Storyboarding', 'Full Studio & Location Filming', 'Online/Offline Media Resizes' ), 'https://i.ytimg.com/vi/rg63iEBbCVU/maxresdefault.jpg', 'Close-up portrait from the Regal Reseau Hotel film', '/work/' ),
		$s( 'cgi-ai-creative', 'CGI / AI Creative', 'Photorealistic 3D simulations and custom generative visual worlds.', array( 'Liquid Dynamic Simulation', '8K Architectural CGI Renders', 'Custom-Trained Generative Concepts' ), 'Palliyaguruge-Jewellers2.webp', 'Jewellery photography by Visual Studios Plus' ),
	);
}

/** Client roster: [name, logo file, sector, keep original colours]. */
function vsp_default_clients() {
	return array(
		array( 'Unilever', 'Unilever-A.png', 'FMCG Global' ),
		array( 'American Express', 'American-Express-logo-a.png', 'Finance & Luxury' ),
		array( 'Omega', 'Omega_Logo-a.png', 'Swiss Luxury' ),
		array( 'CBL Munchee', 'Munchee-Logo-a.png', 'FMCG Food' ),
		array( 'Keells', 'keellslogo-a.png', 'Supermarkets' ),
		array( 'Hilton', 'hilton-a.png', 'Luxury Hospitality' ),
		array( 'UNDP', 'UNDP_logo-1.png', 'Global Development' ),
		array( 'Ahmad Tea London', 'AhmadTeaLogoTransparent-a.png', 'Beverage' ),
		array( 'Cinnamon Hotels', 'Cinnamon-Logo-a.png', 'Resorts & Hotels' ),
		array( 'Multilac', 'Multilac-Logo-a.png', 'Paints & Finishes', true ),
		array( 'Mövenpick Hotels', 'Movenpick_Hotels__Resorts_logo-a.png', 'Hospitality' ),
		array( 'Walker Tours', 'Walker-Tours-A.png', 'Travel & Tourism' ),
		array( 'Uber Eats', 'ubereats-a.png', 'Technology & Food' ),
		array( 'Shangri-La', 'Shangri-La-a.png', 'Hospitality' ),
		array( 'ITC Hotels', 'ITC-a.png', 'Luxury Hospitality' ),
		array( 'Il Gelato', 'Il-Gelato-a.png', 'Artisanal Gelato' ),
		array( 'Cosmopolitan', 'Cosmopoliton-a.png', 'Media & Fashion' ),
		array( 'The Face Shop', 'The-faceshop-logo-a.png', 'Beauty Care' ),
	);
}

/**
 * Case studies (text only). Keys: client, title, tagline, type, year, metric, metric_label, tags, summary.
 * The first three are the flagship projects shown on the homepage.
 */
function vsp_default_cases() {
	$c = function ( $client, $title, $tagline, $type, $year, $metric, $label, $tags, $summary = '' ) {
		return compact( 'client', 'title', 'tagline', 'type', 'year', 'metric', 'summary' ) + array( 'metric_label' => $label, 'tags' => $tags );
	};
	return array(
		$c( 'Nescafé (Nestlé) & CFW', 'Nescafé × Colombo Fashion Week', 'Where High Fashion Meets Caffeine Flavor in Real Time', 'Digital Case Study', '2025', '20K+', 'Engagement Per Reel', array( 'Real-Time Production', 'Fashion Week', 'Social Reels' ), 'We spearheaded the entire social media campaign for Colombo Fashion Week and Nescafé collaboration, crafting a strategy that seamlessly blended runway fashion and flavor. Capturing Sri Lanka’s top designers, stylists, and industry figures in real-time, we delivered dynamic content that positioned Nescafé as a true trendsetter.' ),
		$c( 'Pond\'s Sri Lanka (Unilever)', 'Pond\'s Super Light Gel Launch', 'Dive into 200% Instant Hydration with Zero Heaviness', 'Digital Case Study', '2024', '+142%', 'Social Engagement Lift', array( 'Beauty & Skincare', 'Product Photography', 'Viral Reel Campaign' ), 'For Pond\'s Sri Lanka, we conceptualized and executed a dynamic viral campaign for Pond\'s Super Light Gel, featuring captivating photography and engaging social media reels. Through teasers, launch posts, and post-launch engagement, the campaign went viral across social media platforms.' ),
		$c( 'United Nations Development Programme', 'UNDP Sri Lanka — HackaDev Social Innovation', 'Empowering Grassroots Innovators Across All 9 Provinces', 'Digital Case Study', '2024', 'All 9', 'Provinces Covered', array( 'Social Impact', 'Trilingual Campaign', 'Island-wide Photography' ), 'We partnered with UNDP to showcase their Hackathon project, promoting social innovation through a trilingual campaign. Our work included poster design, social media content, and island-wide authentic documentary photography.' ),
		$c( 'Dankotuwa Porcelain PLC', 'Dankotuwa Porcelain CGI World', 'Breathtaking 3D CGI Animation for World-Class Porcelain', 'Digital Case Study', '2024', '8K Render', 'CGI Asset Fidelity', array( 'CGI Animation', 'Photorealistic 3D', 'Luxury Tableware' ) ),
		$c( 'Ministry of Crab (Asia’s 50 Best)', 'Ministry of Crab Gastronomy', 'Sensory Visuals for Asia’s Most Celebrated Seafood Institution', 'Digital Case Study', '2024', 'Asia\'s 50 Best', 'Restaurant Status', array( 'Culinary Cinematography', 'Gastronomy', 'Luxury Dining' ) ),
		$c( 'Nations Trust Bank / American Express', 'American Express × Swim Week Colombo', '“Don’t Live Without It” — Title Partner Fashion Campaign', 'Digital Case Study', '2024', 'Ultra-Premium', 'Card Position', array( 'Luxury Finance', 'Fashion Runway', 'High-Net-Worth Strategy' ) ),
		$c( 'Knorr (Unilever Sri Lanka)', 'Knorr Mother’s Day Campaign', 'Celebrating the Women Who Bring Warmth, Care & Flavour Home', 'Digital Case Study', '2024', '1.8M', 'Social Video Views', array( 'Emotional Storytelling', 'Mother’s Day', 'Culinary TVC' ) ),
		$c( 'Ceylon Biscuits Limited (CBL)', 'Munchee CBL — Festive AI & Lego Campaign', 'Blending the Magic of Legos with Sri Lanka’s Favorite Biscuits', 'Digital Retainer', '2024', '100% Bespoke', 'AI Visual Generation', array( 'AI Visual Generation', 'Festive Campaign', 'Lego Stop-Motion' ) ),
		$c( 'Ahmad Tea London', 'Ahmad Tea London — Digital Channel Retainer', 'Captivating Content Celebrating British & Ceylon Tea Heritage', 'Digital Retainer', '2024–2026', 'End-to-End', 'Retainer Scope', array( 'Social Retainer', 'Tea Flatlays', 'Sensory Video' ) ),
		$c( 'Swisstek Aluminium PLC', 'Swisstek Aluminium — Technical & Solar Strategy', 'Results-Driven Social Media Strategy for Architectural Systems', 'Digital Retainer', '2024', '', '', array( 'B2B & B2C Social', 'Solar Energy', 'Industrial Storytelling' ) ),
		$c( 'Swadeshi Industrial Works PLC', 'Swadeshi Khomba — Natural Herbal Digital Presence', 'Bringing the Essence of Nature and Neem Healing to Life', 'Digital Retainer', '2024–2026', '', '', array( 'Herbal Wellness', 'Organic Social', 'Skin Health' ) ),
		$c( 'Imorich (Elephant House)', 'Imorich Ice Cream — 5-Year Creative Partnership', 'Elevating Premium Indulgence for Over 5 Consecutive Years', 'Digital Retainer', '2020–2025', '5+ Years', 'Partnership Duration', array( 'Long-Term Retainer', 'Gourmet Gelato', 'Event Activations' ) ),
		$c( 'SOZO Beverages', 'SOZO Sparkling Drinks — Identity & Can Design', 'Clean, Refreshing and Full of Tropical Character', 'Branding Project', '2024', '', '', array( 'Packaging Design', 'Identity System', 'Beverage Can Labels' ) ),
		$c( 'Too Good Chocolatier', 'Too Good Dessert Chocolatier', 'Premium, Distinctive and Irresistibly Crafted Visual Language', 'Branding Project', '2024', '', '', array( 'Luxury Chocolates', 'Packaging Architecture', 'Logo Design' ) ),
		$c( 'Viva La Vida Skincare', 'Viva La Vida Pharma Skincare', 'Consistency and Quiet Luxury Across Every Skincare Touchpoint', 'Branding Project', '2024', '', '', array( 'Quiet Luxury', 'Dermocosmetics', 'Bottle Labels' ) ),
		$c( 'Cairns Bicycle Works', 'CBW (Cairns Bicycle Works) — Australia', '“The Journey of a Bicycle Never Ends”', 'Branding Project', '2023', '', '', array( 'Sporting Identity', 'Minimalist Logomark', 'Outdoor Brand' ) ),
		$c( 'Te Dalu Boutique Hotel', 'Te Dalu — Boutique Hotel Ella', 'Capturing the Charm, Surroundings & Sense of Place in Ella', 'Branding Project', '2023', '', '', array( 'Hospitality Branding', 'Boutique Hotel', 'Amenity Packaging' ) ),
		$c( 'Viva Sri Lanka', 'Viva Malted Food Drink — Avurudu Series', 'Making Avurudu Celebrations Even More Special and Memorable', 'TVC Campaign', '2024', '', '', array( 'TVC Video Series', 'Avurudu Festive', 'Sinhala Cultural' ) ),
		$c( 'MintPay Sri Lanka', 'MintPay — Digital Vouchers Commercial', 'From Concept to Screen: Full-Scale Commercial Production', 'TVC Campaign', '2024', '', '', array( 'Commercial TVC', 'FinTech Gifting', 'Digital Production' ) ),
		$c( 'Swadeshi Industrial Works', 'Swadeshi Khomba — Women’s Day TVC', 'Celebrating the Strength & Natural Beauty of Sri Lankan Women', 'TVC Campaign', '2024', '', '', array( 'Emotional TVC', 'Women’s Day', 'Cultural Authenticity' ) ),
		$c( 'DSI Samson Group', 'DSI Footwear — Everyday Journeys', 'Celebrating the Strength and Everyday Strides of Sri Lankan Women', 'TVC Campaign', '2024', '', '', array( 'Footwear TVC', 'Fast Turnaround', 'Inspiring Women' ) ),
		$c( 'Hilton Colombo / DoubleTree by Hilton', 'Sapphire Dragon Chinese Restaurant', 'Elevating Premium Hospitality & Fine Dining for Hilton Colombo', 'Commercial Photography', '2024', '', '', array( 'Gourmet Photography', 'Luxury Hospitality', 'Hilton Dining' ) ),
	);
}

/** Studio figures shown on the About page: [value, label]. */
function vsp_default_stats() {
	return array(
		array( '50+', 'Premier Brands Partnered' ),
		array( '10M+', 'Organic Digital Views' ),
		array( '5+ Yrs', 'Average Client Retainer' ),
		array( '100%', 'In-House Production Team' ),
	);
}

/** Gallery categories exactly as organised on the current Photography Portfolio page. */
function vsp_default_photo_categories() {
	return array(
		'food'        => array( 'label' => 'Food Photography', 'short' => 'Food', 'cover' => 'CurryLeaf.webp', 'cover_alt' => 'Spices and curry leaves in a dark muffin tray', 'alt' => 'Food photography' ),
		'fashion'     => array( 'label' => 'Fashion', 'short' => 'Fashion', 'cover' => '7.webp', 'cover_alt' => 'Fashion editorial of three models on a white terrace', 'alt' => 'Fashion photography' ),
		'jewellery'   => array( 'label' => 'Jewellery', 'short' => 'Jewellery', 'cover' => 'DSC_1657-2.webp', 'cover_alt' => 'Model wearing a statement ruby ring and necklace', 'alt' => 'Jewellery photography' ),
		'hospitality' => array( 'label' => 'Hospitality / Interior / Architecture', 'short' => 'Hospitality', 'cover' => 'D85_3829-HDR.webp', 'cover_alt' => 'Hotel terrace overlooking misty mountains', 'alt' => 'Hospitality, interior and architecture photography' ),
	);
}

/** The homepage of the current site also lists Product photography as a discipline. */
function vsp_photo_disciplines() {
	return array(
		array( 'Food', 'Site-Card-Food-1536x1025.webp', 'Collage of food photography' ),
		array( 'Product', 'Site-Card-Products-1536x1025.webp', 'Collage of product photography' ),
		array( 'Fashion', 'Site-Card-Fashion-1536x1025.webp', 'Collage of fashion photography' ),
		array( 'Jewellery', 'Site-Card-Jewellry-1536x1025.webp', 'Collage of jewellery photography' ),
		array( 'Hospitality / Interior / Architecture', 'Site-Card-Hospitality-1536x1025.webp', 'Collage of hospitality and interior photography' ),
	);
}

/** [file, width, height, category] */
function vsp_default_photos() {
	return array(
		array( "D85_3829-HDR.webp", 2400, 1599, "hospitality" ),
		array( "D85_2304.webp", 2400, 1728, "hospitality" ),
		array( "D85_1958-HDR.webp", 2400, 1600, "hospitality" ),
		array( "3.webp", 1000, 1498, "fashion" ),
		array( "DSC1313.webp", 1500, 1000, "jewellery" ),
		array( "DSC_1568.webp", 2000, 1333, "hospitality" ),
		array( "KeelesFoodPhotography0403.webp", 750, 1125, "food" ),
		array( "D85_3503.webp", 2400, 1600, "hospitality" ),
		array( "5.webp", 1000, 1498, "fashion" ),
		array( "KeelesFoodPhotography0314.webp", 1500, 1000, "food" ),
		array( "DSC_5393.webp", 500, 750, "jewellery" ),
		array( "AAB_5098-1.webp", 1000, 1000, "food" ),
		array( "D85_3143.webp", 2400, 1600, "hospitality" ),
		array( "78dbdb147514609.62c41bc19dbbb-2.webp", 1400, 935, "jewellery" ),
		array( "DSC_1423.webp", 2000, 1333, "hospitality" ),
		array( "Tiesh-6743-1-2.webp", 500, 749, "jewellery" ),
		array( "AAB_5081.webp", 750, 1125, "food" ),
		array( "DJK_0037.webp", 2400, 1348, "hospitality" ),
		array( "D85_3381.webp", 2400, 1600, "hospitality" ),
		array( "01-2.webp", 750, 751, "jewellery" ),
		array( "VSP3675-Edit.webp", 2400, 1600, "hospitality" ),
		array( "Raja2137.webp", 2000, 1333, "jewellery" ),
		array( "D85_3387.webp", 1170, 1800, "hospitality" ),
		array( "D85_3881.webp", 2400, 1668, "hospitality" ),
		array( "CL4.webp", 500, 750, "food" ),
		array( "DSC9063-as-Smart-Object-1.webp", 1000, 1498, "fashion" ),
		array( "VSP3686-Edit.webp", 2400, 1600, "hospitality" ),
		array( "DSC_9348.webp", 750, 1125, "food" ),
		array( "DSC1348-as-Smart-Object-1.webp", 1500, 1001, "jewellery" ),
		array( "D85_3308.webp", 1295, 1800, "hospitality" ),
		array( "DSC_1283.webp", 2000, 1333, "hospitality" ),
		array( "Tiesh3282-2.webp", 2000, 1332, "jewellery" ),
		array( "DSC1244-as-Smart-Object-1.webp", 750, 1124, "jewellery" ),
		array( "DSC1220-1.webp", 750, 1124, "jewellery" ),
		array( "DSC_1491.webp", 2000, 1333, "hospitality" ),
		array( "Tiesh-7077-1.webp", 1000, 1498, "fashion" ),
		array( "D85_3324.webp", 1324, 1800, "hospitality" ),
		array( "1.webp", 1500, 1001, "fashion" ),
		array( "Tiesh-7224-1-2.webp", 500, 749, "jewellery" ),
		array( "02.webp", 1525, 1800, "hospitality" ),
		array( "EP5.webp", 750, 1125, "food" ),
		array( "ec5387147514609.62c41bc18b7a6.webp", 1400, 935, "jewellery" ),
		array( "DSC3121.webp", 2000, 1335, "food" ),
		array( "Palliyaguruge-Jewellers2.webp", 1800, 1800, "jewellery" ),
		array( "e9552d147514609.62c41bc1944c9.webp", 1400, 935, "jewellery" ),
		array( "Untitled1.webp", 2400, 1629, "hospitality" ),
		array( "CurryLeaf.webp", 750, 1125, "food" ),
		array( "VSP_4792.webp", 750, 750, "jewellery" ),
		array( "DSC5285-1.webp", 750, 1123, "fashion" ),
		array( "DSC9031-1.webp", 1000, 1498, "fashion" ),
		array( "DSC_9344.webp", 750, 1125, "food" ),
		array( "7.webp", 2400, 1602, "fashion" ),
		array( "D85_2078.webp", 2400, 1600, "hospitality" ),
		array( "4.webp", 1500, 1001, "fashion" ),
		array( "VSP_4680.webp", 750, 750, "jewellery" ),
		array( "D85_2501.webp", 2400, 1599, "hospitality" ),
		array( "D85_0856.webp", 2400, 1600, "hospitality" ),
		array( "Egg7.webp", 500, 750, "food" ),
		array( "DSC1422-as-Smart-Object-1.webp", 750, 1124, "jewellery" ),
		array( "D85_3129.webp", 2400, 1600, "hospitality" ),
		array( "VSP_4223.webp", 750, 938, "jewellery" ),
		array( "DJI_0078-HDR.webp", 2400, 1347, "hospitality" ),
		array( "Palliyaguruge-Jewellers4.webp", 1800, 1800, "jewellery" ),
		array( "DSC_1657-2.webp", 1500, 1000, "jewellery" ),
		array( "07e8eb147514609.62c41bc190684-2.webp", 1400, 935, "jewellery" ),
		array( "D85_2666.webp", 2400, 1600, "hospitality" ),
		array( "Palliyaguruge-Jewellers1.webp", 1800, 1800, "jewellery" ),
		array( "DSC9805-1.webp", 1500, 1001, "fashion" ),
		array( "VSP_4637.webp", 750, 750, "jewellery" ),
		array( "D85_3138.webp", 1200, 1800, "hospitality" ),
		array( "D85_3743.webp", 1130, 1800, "hospitality" ),
		array( "DSC_1837.webp", 750, 1125, "food" ),
		array( "VSP_4668.webp", 750, 750, "jewellery" ),
		array( "DJI_0092-HDR.webp", 2400, 1347, "hospitality" ),
		array( "DSC2950-2.webp", 1201, 1800, "food" ),
		array( "DSC_1660.webp", 750, 938, "jewellery" ),
		array( "D85_4887.webp", 2400, 1605, "hospitality" ),
		array( "DSC_1643-2.webp", 1000, 800, "jewellery" ),
		array( "Tiesh3358-2.webp", 1500, 1001, "jewellery" ),
		array( "D85_2612.webp", 2400, 1540, "hospitality" ),
		array( "Egg.webp", 750, 1125, "food" ),
		array( "D85_0719.webp", 1200, 1800, "hospitality" ),
		array( "VHA_2467.webp", 750, 1124, "food" ),
		array( "D85_1989.webp", 1200, 1800, "hospitality" ),
		array( "DJI_0035.webp", 2400, 1362, "hospitality" ),
		array( "Tiesh-7287-1.webp", 1000, 1498, "fashion" ),
		array( "Palliyaguruge-Jewellers3.webp", 1800, 1800, "jewellery" ),
		array( "D85_3195.webp", 2400, 1600, "hospitality" ),
		array( "DSC1059-1.webp", 750, 1124, "jewellery" ),
		array( "DSC1332-as-Smart-Object-1.webp", 750, 1124, "jewellery" ),
		array( "VSP_4738.webp", 750, 750, "jewellery" ),
		array( "CL.webp", 750, 1125, "food" ),
		array( "DSC5425-1.webp", 750, 1123, "fashion" ),
		array( "3aa9e5147514609.62c41bc1805f2-2.webp", 1400, 935, "jewellery" ),
		array( "DSC0904-1.webp", 750, 1123, "jewellery" ),
		array( "DSC_1483.webp", 2000, 1333, "hospitality" ),
		array( "D85_3764.webp", 2400, 1600, "hospitality" ),
		array( "D85_3285.webp", 2400, 1600, "hospitality" ),
		array( "DSC_5396.webp", 500, 750, "jewellery" ),
		array( "2.webp", 2000, 1335, "fashion" ),
		array( "DSC_1848.webp", 750, 1125, "food" ),
		array( "DSC3681-as-Smart-Object-1.webp", 1000, 1499, "fashion" ),
		array( "DSC_5418.webp", 500, 750, "jewellery" ),
		array( "D85_3452.webp", 2400, 1600, "hospitality" ),
		array( "WhatsAppImage2020-11-22at8.43.53AM.webp", 750, 1125, "food" ),
		array( "DSC9563-1.webp", 1500, 1001, "fashion" ),
		array( "DSC6514-as-Smart-Object-1.webp", 750, 1157, "jewellery" ),
		array( "DSC2958.webp", 2000, 1335, "food" ),
		array( "D85_2026.webp", 2400, 1600, "hospitality" ),
		array( "DSC1293-as-Smart-Object-1.webp", 750, 1122, "jewellery" ),
		array( "DSC_5365.webp", 1500, 1000, "jewellery" ),
		array( "D85_0533-HDR.webp", 2400, 1600, "hospitality" ),
		array( "DJI_0100-HDR.webp", 2400, 1347, "hospitality" ),
		array( "D85_2638-HDR.webp", 1198, 1800, "hospitality" ),
		array( "VHA_2019.webp", 750, 1124, "food" ),
	);
}
