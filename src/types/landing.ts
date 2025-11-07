export interface ImageData {
  id: number;
  title: string;
  url: string;
  width?: number;
  height?: number;
}

export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface Benefit {
  id: number;
  title: string;
  description: string;
  stats: string;
  icon: string;
  order: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  name: string;
  title: string;
  company: string;
  photo: ImageData | null;
  order: number;
}

export interface ColorTheme {
  id: number;
  name: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  neutral_color: string;
  background_color: string;
  text_color: string;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  video_source: "upload" | "youtube" | "vimeo" | "external";
  video_url: string;
  thumbnail: ImageData | null;
  duration: string;
  transcript: string;
}

export interface CardContent {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  card_style: "basic" | "feature" | "testimonial" | "pricing" | "team";
  icon: string;
  button_text: string;
  button_url: string;
  price: string;
  price_period: string;
  features: string[];
  rating: number;
  order: number;
  image?: ImageData;
}

export interface DynamicContentBlock {
  type: string;
  value: any;
  id: string;
}

export interface FrontendSite {
  id: number;
  name: string;
  url: string;
  is_active: boolean;
}

export interface LandingPageData {
  header_section_image: any;
  id: number;
  title: string;
  meta: {
    type: string;
    detail_url: string;
    html_url: string | null;
    slug: string;
    show_in_menus: boolean;
    seo_title: string;
    search_description: string;
    first_published_at: string | null;
    last_published_at: string | null;
  };

  // Header Section
  header_title?: string;
  header_subtitle?: string;
  header_description?: string;
  header_cta_primary?: string;
  header_cta_primary_url?: string;
  header_cta_secondary?: string;
  header_cta_secondary_url?: string;
  header_background_image?: ImageData;

  // Features Section
  features_head?: string;
  features_introduction?: string;
  features?: Feature[];

  // Benefits Section
  benefits_head?: string;
  benefits_introduction?: string;
  benefits?: Benefit[];

  // Testimonials Section
  testimonials_head?: string;
  testimonials_introduction?: string;
  testimonials?: Testimonial[];

  // CTA Section
  cta_head?: string;
  cta_introduction?: string;
  cta_primary_text?: string;
  cta_primary_url?: string;
  cta_secondary_text?: string;
  cta_secondary_url?: string;
  cta_offer?: string;

  // SEO & Meta
  meta_title?: string;
  meta_description?: string;
  og_image?: ImageData;

  // Color Theme
  color_theme?: ColorTheme;

  // Video Section
  video_section?: {
    heading: string;
    introduction: string;
    featured_video: Video | null;
  };

  // Card Sections
  card_sections?: {
    heading: string;
    cards: CardContent[];
  };

  // Dynamic Content
  dynamic_content?: DynamicContentBlock[];

  // Frontend Configuration
  allowed_frontends?: FrontendSite[];
}

export interface ApiResponse {
  meta: {
    total_count: number;
  };
  items: LandingPageData[];
}
