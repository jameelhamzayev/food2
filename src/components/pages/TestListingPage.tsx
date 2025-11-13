import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BaseCrudService } from '@/integrations';
import { MarketplaceListings } from '@/entities';

export default function TestListingPage() {
  const [listings, setListings] = useState<MarketplaceListings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        console.log('Testing marketplace listings fetch...');
        const { items } = await BaseCrudService.getAll<MarketplaceListings>('marketplacelistings');
        console.log('Test fetch result:', items);
        
        // Test individual listing fetch
        if (items.length > 0) {
          const firstListing = items[0];
          console.log('Testing individual listing fetch for ID:', firstListing._id);
          
          try {
            const individualListing = await BaseCrudService.getById<MarketplaceListings>('marketplacelistings', firstListing._id);
            console.log('Individual listing fetch result:', individualListing);
          } catch (individualError) {
            console.error('Error fetching individual listing:', individualError);
          }
        }
        
        setListings(items);
      } catch (error) {
        console.error('Error in test fetch:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-backgroundlight p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-3xl font-bold text-primary mb-6">Testing Listings Data</h1>
          <p className="font-paragraph text-primary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundlight p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-3xl font-bold text-primary mb-6">Testing Listings Data</h1>
        
        {error && (
          <Card className="border-red-500 bg-red-50 mb-6">
            <CardContent className="p-4">
              <p className="text-red-700">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        <div className="mb-6">
          <p className="font-paragraph text-primary">Found {listings.length} listings</p>
          <Button asChild className="mt-2">
            <Link to="/marketplace">Back to Marketplace</Link>
          </Button>
        </div>

        <div className="space-y-4">
          {listings.map((listing, index) => (
            <Card key={listing._id} className="border-none shadow-lg bg-textwhite">
              <CardHeader>
                <CardTitle className="font-heading text-lg font-bold text-primary">
                  Listing #{index + 1}: {listing.listingTitle || 'No Title'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>ID:</strong> {listing._id}
                  </div>
                  <div>
                    <strong>Title:</strong> {listing.listingTitle || 'N/A'}
                  </div>
                  <div>
                    <strong>Description:</strong> {listing.description || 'N/A'}
                  </div>
                  <div>
                    <strong>Waste Type:</strong> {listing.wasteType || 'N/A'}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {listing.quantity || 'N/A'}
                  </div>
                  <div>
                    <strong>Unit:</strong> {listing.unitOfMeasure || 'N/A'}
                  </div>
                  <div>
                    <strong>Price:</strong> ${listing.pricePerUnit || 'N/A'}
                  </div>
                  <div>
                    <strong>Location:</strong> {listing.location || 'N/A'}
                  </div>
                  <div>
                    <strong>Available Until:</strong> {listing.availableUntil ? new Date(listing.availableUntil).toLocaleDateString() : 'N/A'}
                  </div>
                  <div>
                    <strong>Created:</strong> {listing._createdDate ? new Date(listing._createdDate).toLocaleDateString() : 'N/A'}
                  </div>
                  <div>
                    <strong>Updated:</strong> {listing._updatedDate ? new Date(listing._updatedDate).toLocaleDateString() : 'N/A'}
                  </div>
                  <div>
                    <strong>Image:</strong> {listing.listingImage ? 'Yes' : 'No'}
                  </div>
                </div>
                
                <div className="mt-4 space-x-2">
                  <Button asChild size="sm">
                    <Link to={`/marketplace/${listing._id}`}>
                      View Details Page
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      console.log('Full listing object:', listing);
                      alert('Check console for full listing object');
                    }}
                  >
                    Log to Console
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}