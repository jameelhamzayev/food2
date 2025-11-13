import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Store, Recycle, ArrowRight, Package, Handshake } from 'lucide-react';

export default function ListWastePage() {
  const [selectedType, setSelectedType] = useState<'seller' | 'recycler' | null>(null);

  if (selectedType) {
    return (
      <div className="min-h-screen bg-backgroundlight">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <Button 
              variant="outline" 
              onClick={() => setSelectedType(null)}
              className="mb-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
            >
              ← Back to Selection
            </Button>
            <h1 className="font-heading text-4xl md:text-5xl font-black text-primary uppercase mb-4">
              {selectedType === 'seller' ? 'List as Seller' : 'Register as Recycler'}
            </h1>
            <p className="font-paragraph text-lg text-primary/70">
              {selectedType === 'seller' 
                ? 'List your food waste for sale to recyclers and other businesses'
                : 'Register your recycling company and offer services to food waste producers'
              }
            </p>
          </div>

          <Card className="border-none shadow-lg bg-textwhite">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="font-heading text-2xl font-bold text-primary mb-4">
                  Coming Soon
                </h3>
                <p className="font-paragraph text-primary/70 mb-6">
                  {selectedType === 'seller' 
                    ? 'The seller listing form is currently under development. You\'ll be able to list your food waste, set prices, and connect with recyclers soon.'
                    : 'The recycler registration form is currently under development. You\'ll be able to register your company, describe your services, and connect with food waste producers soon.'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none">
                    <Link to="/marketplace">
                      Browse Marketplace
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none">
                    <Link to="/contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-backgroundlight">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-5xl md:text-7xl font-black text-primary uppercase mb-6">
            Join Our Platform
          </h1>
          <p className="font-paragraph text-lg text-primary/70 max-w-3xl mx-auto">
            Choose how you'd like to participate in our food waste marketplace ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Seller Card */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-textwhite cursor-pointer" onClick={() => setSelectedType('seller')}>
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="h-10 w-10 text-primary-foreground" />
              </div>
              <CardTitle className="font-heading text-2xl font-black text-primary uppercase">
                I'm a Seller
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="font-paragraph text-primary/70">
                I have food waste to sell and want to connect with recyclers and other businesses
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-secondary" />
                  <span className="font-paragraph text-sm text-primary">List your food waste products</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Handshake className="h-5 w-5 text-secondary" />
                  <span className="font-paragraph text-sm text-primary">Connect with recyclers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ArrowRight className="h-5 w-5 text-secondary" />
                  <span className="font-paragraph text-sm text-primary">Set your own prices</span>
                </div>
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none mt-6">
                Continue as Seller
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Recycler Card */}
          <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-textwhite cursor-pointer" onClick={() => setSelectedType('recycler')}>
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-10 w-10 text-secondary-foreground" />
              </div>
              <CardTitle className="font-heading text-2xl font-black text-primary uppercase">
                I'm a Recycler
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="font-paragraph text-primary/70">
                I run a recycling company and want to offer services to food waste producers
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center space-x-3">
                  <Package className="h-5 w-5 text-secondary" />
                  <span className="font-paragraph text-sm text-primary">Register your company</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Handshake className="h-5 w-5 text-secondary" />
                  <span className="font-paragraph text-sm text-primary">Describe your services</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ArrowRight className="h-5 w-5 text-secondary" />
                  <span className="font-paragraph text-sm text-primary">Accept donations & orders</span>
                </div>
              </div>

              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none mt-6">
                Continue as Recycler
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="font-paragraph text-primary/60 mb-4">
            Not sure which option is right for you?
          </p>
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none">
            <Link to="/about">
              Learn More About Our Platform
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}