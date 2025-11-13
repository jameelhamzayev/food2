import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import { Search, ExternalLink, MapPin, Filter } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { SustainabilityServices, Recyclers } from '@/entities';

export default function ServicesPage() {
  const [services, setServices] = useState<SustainabilityServices[]>([]);
  const [recyclers, setRecyclers] = useState<Recyclers[]>([]);
  const [filteredServices, setFilteredServices] = useState<SustainabilityServices[]>([]);
  const [filteredRecyclers, setFilteredRecyclers] = useState<Recyclers[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'services' | 'recyclers'>('services');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, recyclersData] = await Promise.all([
          BaseCrudService.getAll<SustainabilityServices>('sustainabilityservices'),
          BaseCrudService.getAll<Recyclers>('recyclers')
        ]);
        
        setServices(servicesData.items);
        setRecyclers(recyclersData.items);
        setFilteredServices(servicesData.items);
        setFilteredRecyclers(recyclersData.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filteredSvcs = services;
    let filteredRecs = recyclers;

    if (searchTerm) {
      filteredSvcs = filteredSvcs.filter(service =>
        service.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.partnerName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      filteredRecs = filteredRecs.filter(recycler =>
        recycler.recyclerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recycler.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recycler.wasteTypesAccepted?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (serviceTypeFilter !== 'all') {
      filteredSvcs = filteredSvcs.filter(service => service.serviceType === serviceTypeFilter);
    }

    setFilteredServices(filteredSvcs);
    setFilteredRecyclers(filteredRecs);
  }, [services, recyclers, searchTerm, serviceTypeFilter]);

  const serviceTypes = [...new Set(services.map(service => service.serviceType).filter(Boolean))];

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
          <h1 className="font-heading text-5xl md:text-7xl font-black uppercase mb-4">
            Services & Partners
          </h1>
          <p className="font-paragraph text-lg text-primary-foreground/80 max-w-3xl">
            Connect with our network of sustainability services and recycling partners to transform your food waste into valuable resources
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-textwhite border-b">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'services' ? 'default' : 'outline'}
                onClick={() => setActiveTab('services')}
                className="rounded-none"
              >
                Sustainability Services ({services.length})
              </Button>
              <Button
                variant={activeTab === 'recyclers' ? 'default' : 'outline'}
                onClick={() => setActiveTab('recyclers')}
                className="rounded-none"
              >
                Recycling Partners ({recyclers.length})
              </Button>
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-primary/20 focus:border-primary rounded-none w-64"
                />
              </div>
              
              {activeTab === 'services' && (
                <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
                  <SelectTrigger className="w-48 border-primary/20 focus:border-primary rounded-none">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Service Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {serviceTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      {activeTab === 'services' && (
        <section className="py-12">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                {filteredServices.length} Services Available
              </h2>
              <p className="font-paragraph text-primary/70">
                Professional sustainability services to help transform your food waste
              </p>
            </div>

            {filteredServices.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">No services found</h3>
                <p className="font-paragraph text-primary/70">
                  Try adjusting your search criteria or check back later for new services.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredServices.map((service) => (
                  <Card key={service._id} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-textwhite">
                    <CardContent className="p-6">
                      {service.serviceImage && (
                        <Image 
                          src={service.serviceImage} 
                          alt={service.serviceName || ''}
                          width={400}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-heading text-xl font-bold text-primary mb-2">
                            {service.serviceName}
                          </h3>
                          {service.serviceType && (
                            <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 text-xs font-paragraph font-bold rounded-full">
                              {service.serviceType}
                            </span>
                          )}
                        </div>
                        
                        <p className="font-paragraph text-sm text-primary/70">
                          {service.shortDescription}
                        </p>
                        
                        {service.partnerName && (
                          <div className="flex items-center gap-2">
                            <span className="font-paragraph text-xs text-primary/60">Partner:</span>
                            <span className="font-paragraph text-sm font-medium text-primary">
                              {service.partnerName}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                            <Link to={`/services/${service._id}`}>
                              View Details
                            </Link>
                          </Button>
                          {service.contactUrl && (
                            <Button asChild variant="outline" size="sm" className="rounded-none">
                              <a href={service.contactUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Recyclers Grid */}
      {activeTab === 'recyclers' && (
        <section className="py-12">
          <div className="max-w-[100rem] mx-auto px-6">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-primary mb-2">
                {filteredRecyclers.length} Recycling Partners
              </h2>
              <p className="font-paragraph text-primary/70">
                Certified recycling partners ready to process your food waste
              </p>
            </div>

            {filteredRecyclers.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">No recyclers found</h3>
                <p className="font-paragraph text-primary/70">
                  Try adjusting your search criteria or check back later for new partners.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRecyclers.map((recycler) => (
                  <Card key={recycler._id} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-textwhite">
                    <CardContent className="p-6">
                      {recycler.logo && (
                        <Image 
                          src={recycler.logo} 
                          alt={recycler.recyclerName || ''}
                          width={400}
                          className="w-full h-32 object-contain bg-gray-50 rounded-lg mb-4"
                        />
                      )}
                      
                      <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold text-primary">
                          {recycler.recyclerName}
                        </h3>
                        
                        <p className="font-paragraph text-sm text-primary/70">
                          {recycler.description}
                        </p>
                        
                        {recycler.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary/60" />
                            <span className="font-paragraph text-sm text-primary">
                              {recycler.location}
                            </span>
                          </div>
                        )}
                        
                        {recycler.wasteTypesAccepted && (
                          <div>
                            <span className="font-paragraph text-xs text-primary/60 block mb-1">
                              Accepts:
                            </span>
                            <span className="font-paragraph text-sm text-primary">
                              {recycler.wasteTypesAccepted}
                            </span>
                          </div>
                        )}

                        {recycler.productsInReturn && (
                          <div>
                            <span className="font-paragraph text-xs text-primary/60 block mb-1">
                              Products in Return:
                            </span>
                            <span className="font-paragraph text-sm text-primary">
                              {recycler.productsInReturn}
                            </span>
                          </div>
                        )}
                        
                        <div className="flex gap-2">
                          <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                            <Link to={`/recyclers/${recycler._id}`}>
                              View Details
                            </Link>
                          </Button>
                          {recycler.websiteUrl && (
                            <Button asChild variant="outline" size="sm" className="rounded-none">
                              <a href={recycler.websiteUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}