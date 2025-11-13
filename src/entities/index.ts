/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: blogposts
 * Interface for BlogPosts
 */
export interface BlogPosts {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  slug?: string;
  /** @wixFieldType text */
  author?: string;
  /** @wixFieldType date */
  publishDate?: Date | string;
  /** @wixFieldType image */
  featuredImage?: string;
  /** @wixFieldType text */
  excerpt?: string;
  /** @wixFieldType text */
  content?: string;
  /** @wixFieldType text */
  category?: string;
}


/**
 * Collection ID: howitworkssteps
 * Interface for HowItWorksSteps
 */
export interface HowItWorksSteps {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType number */
  stepNumber?: number;
  /** @wixFieldType text */
  stepTitle?: string;
  /** @wixFieldType text */
  stepDescription?: string;
  /** @wixFieldType image */
  stepImage?: string;
  /** @wixFieldType text */
  ctaText?: string;
  /** @wixFieldType url */
  ctaUrl?: string;
}


/**
 * Collection ID: impactmetrics
 * Interface for ImpactMetrics
 */
export interface ImpactMetrics {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  metricName?: string;
  /** @wixFieldType number */
  metricValue?: number;
  /** @wixFieldType text */
  unitOfMeasure?: string;
  /** @wixFieldType text */
  metricDescription?: string;
  /** @wixFieldType date */
  lastUpdated?: Date | string;
  /** @wixFieldType image */
  visualRepresentation?: string;
}


/**
 * Collection ID: marketplacelistings
 * Interface for MarketplaceListings
 */
export interface MarketplaceListings {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  listingTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  wasteType?: string;
  /** @wixFieldType number */
  quantity?: number;
  /** @wixFieldType text */
  unitOfMeasure?: string;
  /** @wixFieldType number */
  pricePerUnit?: number;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType image */
  listingImage?: string;
  /** @wixFieldType datetime */
  availableUntil?: Date | string;
}


/**
 * Collection ID: recyclers
 * Interface for Recyclers
 */
export interface Recyclers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  recyclerName?: string;
  /** @wixFieldType image */
  logo?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  location?: string;
  /** @wixFieldType url */
  websiteUrl?: string;
  /** @wixFieldType text */
  wasteTypesAccepted?: string;
}


/**
 * Collection ID: sustainabilityservices
 * Interface for SustainabilityServices
 */
export interface SustainabilityServices {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  shortDescription?: string;
  /** @wixFieldType text */
  fullDescription?: string;
  /** @wixFieldType text */
  serviceType?: string;
  /** @wixFieldType text */
  partnerName?: string;
  /** @wixFieldType image */
  serviceImage?: string;
  /** @wixFieldType url */
  contactUrl?: string;
}
