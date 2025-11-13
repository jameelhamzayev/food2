import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Leaf, Recycle, TrendingUp, Users, Factory, Zap, TreePine, Droplets } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ImpactMetrics } from '@/entities';

export default function ImpactPage() {
  const [metrics, setMetrics] = useState<ImpactMetrics[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { items } = await BaseCrudService.getAll<ImpactMetrics>('impactmetrics');
        setMetrics(items);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const getMetricIcon = (index: number) => {
    const icons = [Leaf, Recycle, TrendingUp, Users, Factory, Zap, TreePine, Droplets];
    return icons[index % icons.length];
  };

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
      <section className="bg-backgrounddark text-textwhite py-20">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center">
            <h1 className="font-heading text-5xl md:text-7xl font-black uppercase mb-6">
              Environmental Impact
            </h1>
            <p className="font-paragraph text-lg text-textwhite/80 max-w-3xl mx-auto">
              Track the positive environmental impact of our food waste recycling community. 
              Together, we're creating a more sustainable future through innovative waste management solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Key Metrics Grid */}
      <section className="py-16 bg-textwhite">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-primary uppercase mb-4">
              Key Impact Metrics
            </h2>
            <p className="font-paragraph text-lg text-primary/70">
              Real-time data showing our collective environmental achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => {
              const Icon = getMetricIcon(index);
              
              return (
                <Card key={metric._id} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon className="h-8 w-8 text-secondary-foreground" />
                    </div>
                    
                    <div className="text-4xl font-heading font-black text-primary mb-2">
                      {metric.metricValue?.toLocaleString()}{metric.unitOfMeasure}
                    </div>
                    
                    <h3 className="font-heading text-lg font-bold text-primary mb-3 uppercase">
                      {metric.metricName}
                    </h3>
                    
                    <p className="font-paragraph text-sm text-primary/70 mb-4">
                      {metric.metricDescription}
                    </p>
                    
                    {metric.lastUpdated && (
                      <p className="font-paragraph text-xs text-primary/50">
                        Last updated: {new Date(metric.lastUpdated).toLocaleDateString()}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Representations */}
      <section className="py-16 bg-background">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-primary uppercase mb-4">
              Impact Visualizations
            </h2>
            <p className="font-paragraph text-lg text-primary/70">
              Visual representations of our environmental achievements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.filter(metric => metric.visualRepresentation).map((metric) => (
              <Card key={`visual-${metric._id}`} className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-textwhite">
                <CardHeader>
                  <CardTitle className="font-heading text-xl font-bold text-primary uppercase">
                    {metric.metricName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {metric.visualRepresentation && (
                    <Image 
                      src={metric.visualRepresentation} 
                      alt={`${metric.metricName} visualization`}
                      width={400}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <div className="text-center">
                    <div className="text-3xl font-heading font-black text-primary mb-2">
                      {metric.metricValue?.toLocaleString()}{metric.unitOfMeasure}
                    </div>
                    <p className="font-paragraph text-sm text-primary/70">
                      {metric.metricDescription}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 bg-textwhite">
        <div className="max-w-[100rem] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-primary uppercase mb-4">
              Our Environmental Goals
            </h2>
            <p className="font-paragraph text-lg text-primary/70 max-w-3xl mx-auto">
              We're committed to creating measurable environmental impact through innovative food waste management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-primary text-primary-foreground">
              <CardContent className="p-8 text-center">
                <Leaf className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold uppercase mb-4">
                  Carbon Reduction
                </h3>
                <p className="font-paragraph text-primary-foreground/80">
                  Reducing greenhouse gas emissions by diverting food waste from landfills and converting it into renewable energy and compost.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-secondary text-secondary-foreground">
              <CardContent className="p-8 text-center">
                <Recycle className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold uppercase mb-4">
                  Circular Economy
                </h3>
                <p className="font-paragraph text-secondary-foreground/80">
                  Creating a circular economy where food waste becomes valuable resources, reducing the need for virgin materials and energy.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg bg-backgrounddark text-textwhite">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold uppercase mb-4">
                  Sustainable Growth
                </h3>
                <p className="font-paragraph text-textwhite/80">
                  Building a sustainable platform that grows environmental benefits alongside economic opportunities for all participants.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-secondary">
        <div className="max-w-[100rem] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-secondary-foreground uppercase mb-6">
            Join Our Impact Mission
          </h2>
          <p className="font-paragraph text-lg text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Every piece of food waste diverted from landfills contributes to our collective environmental impact. 
            Be part of the solution and help us reach our sustainability goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/marketplace/submit" 
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 font-paragraph text-base transition-colors"
            >
              Start Contributing Today
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center justify-center px-8 py-4 border border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary font-paragraph text-base transition-colors"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}