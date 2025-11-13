import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ArrowLeft, MapPin, Calendar, Package, DollarSign, Clock, User, Phone, Mail, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { MarketplaceListings } from '@/entities';

export default function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listing, setListing] = useState<MarketplaceListings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) {
        setError('No listing ID provided');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Fetching listing with ID:', id);
        const listingData = await BaseCrudService.getById<MarketplaceListings>('marketplacelistings', id);
        console.log('Fetched listing data:', listingData);
        
        if (!listingData) {
          setError('Listing not found');
          return;
        }
        
        setListing(listingData);
        setError(null);
      } catch (error) {
        console.error('Error fetching listing:', error);
        setError(`Failed to load listing details: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-backgroundlight">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="font-paragraph text-primary">Loading listing details...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen bg-backgroundlight">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-bold text-primary mb-4">
              {error || 'Listing Not Found'}
            </h1>
            <p className="font-paragraph text-primary mb-6">
              {error ? 
                'There was an error loading the listing details. Please try again or contact support if the problem persists.' :
                'The listing you\'re looking for doesn\'t exist or has been removed.'
              }
            </p>
            <div className="space-y-4">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <Link to="/marketplace">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Marketplace
                </Link>
              </Button>
              {error && (
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
                >
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundlight">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/marketplace')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Basic Info */}
          <div className="space-y-6">
            {/* Main Image */}
            {listing.listingImage && (
              <Card className="border-none shadow-lg bg-textwhite overflow-hidden">
                <Image 
                  src={listing.listingImage} 
                  alt={listing.listingTitle || 'Listing image'}
                  width={600}
                  className="w-full h-96 object-cover"
                />
              </Card>
            )}

            {/* Quick Info Card */}
            <Card className="border-none shadow-lg bg-textwhite">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold text-primary uppercase">
                  Quick Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Waste Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-secondary" />
                    <span className="font-paragraph text-sm text-primary">Waste Type:</span>
                  </div>
                  <span className="font-paragraph text-sm font-bold text-primary">
                    {listing.wasteType || 'Not specified'}
                  </span>
                </div>

                {/* Price per Unit */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-secondary" />
                    <span className="font-paragraph text-sm text-primary">Price per Unit:</span>
                  </div>
                  <span className="font-paragraph text-sm font-bold text-primary">
                    ${listing.pricePerUnit || 0}/{listing.unitOfMeasure || 'unit'}
                  </span>
                </div>

                {/* Available Quantity */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-5 w-5 text-secondary" />
                    <span className="font-paragraph text-sm text-primary">Available Quantity:</span>
                  </div>
                  <span className="font-paragraph text-sm font-bold text-primary">
                    {listing.quantity || 0} {listing.unitOfMeasure || 'units'}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-secondary" />
                    <span className="font-paragraph text-sm text-primary">Location:</span>
                  </div>
                  <span className="font-paragraph text-sm font-bold text-primary">
                    {listing.location || 'Not specified'}
                  </span>
                </div>

                {/* Available Until */}
                {listing.availableUntil && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-secondary" />
                      <span className="font-paragraph text-sm text-primary">Available Until:</span>
                    </div>
                    <span className="font-paragraph text-sm font-bold text-primary">
                      {new Date(listing.availableUntil).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                {/* Listed On */}
                {listing._createdDate && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-secondary" />
                      <span className="font-paragraph text-sm text-primary">Listed On:</span>
                    </div>
                    <span className="font-paragraph text-sm font-bold text-primary">
                      {new Date(listing._createdDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                {/* Last Updated */}
                {listing._updatedDate && listing._updatedDate !== listing._createdDate && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-secondary" />
                      <span className="font-paragraph text-sm text-primary">Last Updated:</span>
                    </div>
                    <span className="font-paragraph text-sm font-bold text-primary">
                      {new Date(listing._updatedDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                {/* Listing ID for debugging */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-paragraph text-xs text-primary">Listing ID:</span>
                  </div>
                  <span className="font-paragraph text-xs font-mono text-primary">
                    {listing._id}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="space-y-6">
            {/* Title and Price */}
            <Card className="border-none shadow-lg bg-textwhite">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1 mr-4">
                    <h1 className="font-heading text-3xl md:text-4xl font-black text-primary uppercase mb-2">
                      {listing.listingTitle || 'Untitled Listing'}
                    </h1>
                    {listing.wasteType && (
                      <div className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-paragraph font-bold">
                        {listing.wasteType}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">
                      <div className="font-heading text-2xl font-bold">
                        ${listing.pricePerUnit || 0}
                      </div>
                      <div className="font-paragraph text-sm">
                        per {listing.unitOfMeasure || 'unit'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Value Calculation */}
                <div className="bg-backgroundlight p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-paragraph text-primary">Total Value:</span>
                    <span className="font-heading text-xl font-bold text-primary">
                      ${((listing.pricePerUnit || 0) * (listing.quantity || 0)).toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm font-paragraph text-primary mt-1">
                    ({listing.quantity || 0} {listing.unitOfMeasure || 'units'} × ${listing.pricePerUnit || 0})
                  </div>
                </div>

                {/* Additional Details */}
                {(listing._createdDate || listing._updatedDate) && (
                  <div className="border-t pt-4 space-y-2">
                    {listing._createdDate && (
                      <div className="flex justify-between text-sm">
                        <span className="font-paragraph text-primary">Created:</span>
                        <span className="font-paragraph text-primary font-medium">
                          {new Date(listing._createdDate).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {listing._updatedDate && listing._updatedDate !== listing._createdDate && (
                      <div className="flex justify-between text-sm">
                        <span className="font-paragraph text-primary">Updated:</span>
                        <span className="font-paragraph text-primary font-medium">
                          {new Date(listing._updatedDate).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="border-none shadow-lg bg-textwhite">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold text-primary uppercase">
                  Description & Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-paragraph font-bold text-primary mb-2">Description:</h4>
                  <p className="font-paragraph text-primary leading-relaxed">
                    {listing.description || 'No description provided for this listing.'}
                  </p>
                </div>
                
                {/* All available fields display */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <span className="font-paragraph text-sm text-primary font-bold">Waste Type:</span>
                    <p className="font-paragraph text-primary">{listing.wasteType || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-paragraph text-sm text-primary font-bold">Unit of Measure:</span>
                    <p className="font-paragraph text-primary">{listing.unitOfMeasure || 'Not specified'}</p>
                  </div>
                  <div>
                    <span className="font-paragraph text-sm text-primary font-bold">Available Quantity:</span>
                    <p className="font-paragraph text-primary">{listing.quantity || 0} {listing.unitOfMeasure || 'units'}</p>
                  </div>
                  <div>
                    <span className="font-paragraph text-sm text-primary font-bold">Price per Unit:</span>
                    <p className="font-paragraph text-primary">${listing.pricePerUnit || 0}</p>
                  </div>
                  <div>
                    <span className="font-paragraph text-sm text-primary font-bold">Location:</span>
                    <p className="font-paragraph text-primary">{listing.location || 'Not specified'}</p>
                  </div>
                  {listing.availableUntil && (
                    <div>
                      <span className="font-paragraph text-sm text-primary font-bold">Available Until:</span>
                      <p className="font-paragraph text-primary">
                        {new Date(listing.availableUntil).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  )}
                </div>

                {/* Debug information */}
                <div className="bg-gray-50 p-3 rounded-lg mt-4">
                  <h5 className="font-paragraph text-xs text-primary font-bold mb-2">Technical Details:</h5>
                  <div className="grid grid-cols-1 gap-1 text-xs font-mono">
                    <div><span className="text-primary">ID:</span> {listing._id}</div>
                    {listing._createdDate && (
                      <div><span className="text-primary">Created:</span> {new Date(listing._createdDate).toISOString()}</div>
                    )}
                    {listing._updatedDate && (
                      <div><span className="text-primary">Updated:</span> {new Date(listing._updatedDate).toISOString()}</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-none shadow-lg bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold uppercase">
                  Interested in This Listing?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="font-paragraph">
                  Contact the seller to discuss purchase details, pickup arrangements, and any special requirements.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    asChild 
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none"
                  >
                    <a href={`mailto:seller@example.com?subject=Interest in ${encodeURIComponent(listing.listingTitle || 'Food Waste Listing')}&body=${encodeURIComponent(`Hi, I'm interested in your food waste listing: ${listing.listingTitle || 'Untitled Listing'}. 

Details:
- Waste Type: ${listing.wasteType || 'Not specified'}
- Quantity: ${listing.quantity || 0} ${listing.unitOfMeasure || 'units'}
- Price: ${listing.pricePerUnit || 0} per ${listing.unitOfMeasure || 'unit'}
- Total Value: ${((listing.pricePerUnit || 0) * (listing.quantity || 0)).toFixed(2)}
- Location: ${listing.location || 'Not specified'}

Please let me know about availability and pickup details.`)}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Contact Seller via Email
                    </a>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-none"
                  >
                    <a href="tel:+1234567890">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Seller
                    </a>
                  </Button>
                </div>

                <div className="text-sm font-paragraph text-primary-foreground/80 mt-4">
                  <p>💡 <strong>Tip:</strong> When contacting the seller, mention:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Your intended use for the waste material</li>
                    <li>Your preferred pickup time and date</li>
                    <li>Any special handling requirements</li>
                    <li>Your contact information for coordination</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <Card className="border-none shadow-lg bg-textwhite">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild variant="outline" className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none">
                    <Link to="/marketplace">
                      Browse More Listings
                    </Link>
                  </Button>
                  <Button asChild className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none">
                    <Link to="/list-waste">
                      List Your Own Waste
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}