import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { Search, Filter, MapPin, Calendar, Plus } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { MarketplaceListings } from '@/entities';

export default function MarketplacePage() {
  const [listings, setListings] = useState<MarketplaceListings[]>([]);
  const [filteredListings, setFilteredListings] = useState<MarketplaceListings[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [wasteTypeFilter, setWasteTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const { items } = await BaseCrudService.getAll<MarketplaceListings>('marketplacelistings');
        setListings(items);
        setFilteredListings(items);
      } catch (error) {
        console.error('Error fetching listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    let filtered = listings;

    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.listingTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (wasteTypeFilter !== 'all') {
      filtered = filtered.filter(listing => listing.wasteType === wasteTypeFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(listing => listing.location === locationFilter);
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, wasteTypeFilter, locationFilter]);

  const wasteTypes = [...new Set(listings.map(listing => listing.wasteType).filter(Boolean))];
  const locations = [...new Set(listings.map(listing => listing.location).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundlight">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="font-heading text-5xl md:text-7xl font-black uppercase mb-4">
                Marketplace
              </h1>
              <p className="font-paragraph text-lg text-primary-foreground/80 max-w-2xl">
                Discover available food waste listings with real-time pricing and connect with recyclers
              </p>
            </div>
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none">
              <Link to="/list-waste">
                <Plus className="mr-2 h-5 w-5" />
                List Your Waste
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-textwhite border-b">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
              <Input
                placeholder="Search listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-primary/20 focus:border-primary rounded-none"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={wasteTypeFilter} onValueChange={setWasteTypeFilter}>
                <SelectTrigger className="w-48 border-primary/20 focus:border-primary rounded-none">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Waste Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {wasteTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-48 border-primary/20 focus:border-primary rounded-none">
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Grid */}
      <section className="py-12">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-heading text-2xl font-bold text-primary">
              {filteredListings.length} Listings Available
            </h2>
          </div>

          {filteredListings.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-2">No listings found</h3>
              <p className="font-paragraph text-primary mb-6">
                Try adjusting your search criteria or check back later for new listings.
              </p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                <Link to="/list-waste">
                  Create First Listing
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredListings.map((listing) => (
                <Card key={listing._id} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-textwhite">
                  <CardContent className="p-0">
                    {listing.listingImage && (
                      <Image 
                        src={listing.listingImage} 
                        alt={listing.listingTitle || ''}
                        width={400}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-heading text-xl font-bold text-primary">
                          {listing.listingTitle}
                        </h3>
                        <span className="bg-secondary text-secondary-foreground px-3 py-1 text-sm font-paragraph font-bold">
                          ${listing.pricePerUnit}/{listing.unitOfMeasure}
                        </span>
                      </div>
                      
                      <p className="font-paragraph text-sm text-primary mb-4 line-clamp-3">
                        {listing.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between items-center text-sm font-paragraph">
                          <span className="text-primary">Type:</span>
                          <span className="text-primary font-medium">{listing.wasteType}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-paragraph">
                          <span className="text-primary">Quantity:</span>
                          <span className="text-primary font-medium">{listing.quantity} {listing.unitOfMeasure}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm font-paragraph">
                          <span className="text-primary">Location:</span>
                          <span className="text-primary font-medium">{listing.location}</span>
                        </div>
                        {listing.availableUntil && (
                          <div className="flex justify-between items-center text-sm font-paragraph">
                            <span className="text-primary">Available until:</span>
                            <span className="text-primary font-medium">
                              {new Date(listing.availableUntil).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                        <Link to={`/marketplace/${listing._id}`}>
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}