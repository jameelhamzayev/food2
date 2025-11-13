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
 * Collection ID: marketplaceorders
 * Interface for MarketplaceOrders
 */
export interface MarketplaceOrders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  orderNumber?: string;
  /** @wixFieldType text */
  buyerId?: string;
  /** @wixFieldType text */
  listingId?: string;
  /** @wixFieldType number */
  quantity?: number;
  /** @wixFieldType number */
  totalPrice?: number;
  /** @wixFieldType datetime */
  transactionDate?: Date | string;
  /** @wixFieldType text */
  orderStatus?: string;
}


/**
 * Collection ID: recyclerorders
 * Interface for RecyclerOrders
 */
export interface RecyclerOrders {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  initiatingUserDisplayName?: string;
  /** @wixFieldType text */
  recyclerDisplayName?: string;
  /** @wixFieldType text */
  transactionType?: string;
  /** @wixFieldType datetime */
  transactionDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
  /** @wixFieldType number */
  amount?: number;
  /** @wixFieldType text */
  transactionDetails?: string;
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
  /** @wixFieldType text */
  productsInReturn?: string;
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
  /** @wixFieldType text */
  recyclerId?: string;
}
