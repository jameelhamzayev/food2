import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { ArrowRight, Leaf, Recycle, TrendingUp, Users } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HowItWorksSteps, ImpactMetrics, MarketplaceListings } from '@/entities';

export default function HomePage() {
  const [howItWorksSteps, setHowItWorksSteps] = useState<HowItWorksSteps[]>([]);
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics[]>([]);
  const [featuredListings, setFeaturedListings] = useState<MarketplaceListings[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stepsData, metricsData, listingsData] = await Promise.all([
          BaseCrudService.getAll<HowItWorksSteps>('howitworkssteps'),
          BaseCrudService.getAll<ImpactMetrics>('impactmetrics'),
          BaseCrudService.getAll<MarketplaceListings>('marketplacelistings')
        ]);

        setHowItWorksSteps(stepsData.items.sort((a, b) => (a.stepNumber || 0) - (b.stepNumber || 0)));
        setImpactMetrics(metricsData.items);
        setFeaturedListings(listingsData.items.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full Bleed with Inspiration Layout */}
      <section className="w-full max-w-[120rem] mx-auto min-h-screen relative overflow-hidden bg-gradient-to-br from-backgroundlight via-background to-backgrounddark">
        {/* Hero Content - Asymmetrical Layout Inspired by Image */}
        <div className="relative z-10 pt-20 pb-20 px-6">
          <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[70vh]">
            {/* Left Side - Bold Typography (Inspired Layout) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black text-primary uppercase leading-none tracking-tight">
                  TRANSFORM
                  <br />
                  FOOD WASTE
                </h1>
                <div className="font-paragraph text-lg md:text-xl text-primary/80 max-w-2xl">
                  <span className="block mb-2">Connect • Repurpose • Impact</span>
                  <span className="text-base">Turn inedible food leftovers into valuable resources through our sustainable marketplace ecosystem.</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <Button 
                  asChild 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base px-8 py-4 rounded-none"
                >
                  <Link to="/list-waste">
                    List Your Waste <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph text-base px-8 py-4 rounded-none"
                >
                  <Link to="/services">
                    Find Recyclers
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Visual Elements */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                <div className="absolute inset-0 bg-secondary/20 rounded-lg transform rotate-3"></div>
                <div className="relative bg-textwhite/90 p-8 rounded-lg shadow-2xl">
                  <div className="grid grid-cols-2 gap-6">
                    {impactMetrics.slice(0, 4).map((metric, index) => (
                      <div key={metric._id} className="text-center">
                        <div className="text-3xl font-heading font-black text-primary">
                          {metric.metricValue?.toLocaleString()}{metric.unitOfMeasure}
                        </div>
                        <div className="text-sm font-paragraph text-primary/70 mt-1">
                          {metric.metricName}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Texture Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-secondary transform rotate-45"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-primary transform -rotate-12"></div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-textwhite">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-black text-primary uppercase mb-6">
              How It Works
            </h2>
            <p className="font-paragraph text-lg text-primary/80 max-w-3xl mx-auto">
              Our streamlined process connects food producers with recyclers and sustainability services, 
              creating a circular economy for food waste management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((step, index) => (
              <Card key={step._id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="font-heading text-2xl font-black text-secondary-foreground">
                      {step.stepNumber}
                    </span>
                  </div>
                  {step.stepImage && (
                    <Image 
                      src={step.stepImage} 
                      alt={step.stepTitle || ''}
                      width={200}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="font-heading text-xl font-bold text-primary uppercase mb-3">
                    {step.stepTitle}
                  </h3>
                  <p className="font-paragraph text-sm text-primary/70 mb-4">
                    {step.stepDescription}
                  </p>
                  {step.ctaText && step.ctaUrl && (
                    <Button asChild variant="outline" size="sm" className="rounded-none">
                      <Link to={step.ctaUrl}>
                        {step.ctaText}
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Marketplace Section */}
      <section className="py-20 bg-backgroundlight">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-black text-primary uppercase mb-4">
                Live Marketplace
              </h2>
              <p className="font-paragraph text-lg text-primary/80">
                Discover available food waste listings with real-time pricing
              </p>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
              <Link to="/marketplace">
                View All Listings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <Card key={listing._id} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
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
                    <p className="font-paragraph text-sm text-primary/70 mb-4">
                      {listing.description}
                    </p>
                    <div className="flex justify-between items-center text-sm font-paragraph text-primary/60">
                      <span>{listing.quantity} {listing.unitOfMeasure}</span>
                      <span>{listing.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Dashboard Preview */}
      <section className="py-20 bg-backgrounddark text-textwhite">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase mb-6">
              Environmental Impact
            </h2>
            <p className="font-paragraph text-lg text-textwhite/80 max-w-3xl mx-auto">
              Track the positive environmental impact of our food waste recycling community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => {
              const icons = [Leaf, Recycle, TrendingUp, Users];
              const Icon = icons[index % icons.length];
              
              return (
                <div key={metric._id} className="text-center">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div className="text-4xl font-heading font-black text-secondary mb-2">
                    {metric.metricValue?.toLocaleString()}{metric.unitOfMeasure}
                  </div>
                  <div className="font-paragraph text-textwhite/80 mb-2">
                    {metric.metricName}
                  </div>
                  <div className="font-paragraph text-sm text-textwhite/60">
                    {metric.metricDescription}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="border-textwhite text-textwhite hover:bg-textwhite hover:text-backgrounddark rounded-none">
              <Link to="/impact">
                View Full Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-black text-secondary-foreground uppercase mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our community of food producers, recyclers, and sustainability partners working together 
            to create a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
              <Link to="/contact">
                Join Our Platform
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary rounded-none">
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}