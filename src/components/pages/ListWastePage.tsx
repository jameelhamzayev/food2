import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store, Recycle, ArrowRight, Package, Handshake, Save, Upload, ImageIcon, X } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { MarketplaceListings, Recyclers } from '@/entities';
import { Image } from '@/components/ui/image';

export default function ListWastePage() {
  const [selectedType, setSelectedType] = useState<'seller' | 'recycler' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Helper function to handle file upload
  const handleFileUpload = (file: File, type: 'seller' | 'recycler') => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'seller') {
          setSellerForm({...sellerForm, listingImage: result});
        } else {
          setRecyclerForm({...recyclerForm, logo: result});
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper function to remove uploaded photo
  const removePhoto = (type: 'seller' | 'recycler') => {
    if (type === 'seller') {
      setSellerForm({...sellerForm, listingImage: ''});
    } else {
      setRecyclerForm({...recyclerForm, logo: ''});
    }
  };

  // Seller form state
  const [sellerForm, setSellerForm] = useState({
    listingTitle: '',
    description: '',
    wasteType: '',
    quantity: '',
    unitOfMeasure: '',
    pricePerUnit: '',
    location: '',
    availableUntil: '',
    listingImage: ''
  });

  // Recycler form state
  const [recyclerForm, setRecyclerForm] = useState({
    recyclerName: '',
    description: '',
    location: '',
    websiteUrl: '',
    wasteTypesAccepted: '',
    productsInReturn: '',
    logo: ''
  });

  const handleSellerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const listingData: MarketplaceListings = {
        _id: crypto.randomUUID(),
        listingTitle: sellerForm.listingTitle,
        description: sellerForm.description,
        wasteType: sellerForm.wasteType,
        quantity: parseFloat(sellerForm.quantity),
        unitOfMeasure: sellerForm.unitOfMeasure,
        pricePerUnit: parseFloat(sellerForm.pricePerUnit),
        location: sellerForm.location,
        availableUntil: sellerForm.availableUntil ? new Date(sellerForm.availableUntil) : undefined,
        listingImage: sellerForm.listingImage || 'https://static.wixstatic.com/media/fdedf3_80090392b0aa4f50a42dcea3ebae69a9~mv2.png?originWidth=768&originHeight=576'
      };

      await BaseCrudService.create('marketplacelistings', listingData);
      navigate('/marketplace');
    } catch (error) {
      console.error('Error creating listing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRecyclerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const recyclerData: Recyclers = {
        _id: crypto.randomUUID(),
        recyclerName: recyclerForm.recyclerName,
        description: recyclerForm.description,
        location: recyclerForm.location,
        websiteUrl: recyclerForm.websiteUrl,
        wasteTypesAccepted: recyclerForm.wasteTypesAccepted,
        productsInReturn: recyclerForm.productsInReturn,
        logo: recyclerForm.logo || 'https://static.wixstatic.com/media/fdedf3_b294de5dca764a4aa7b337293e637bbe~mv2.png?originWidth=768&originHeight=576'
      };

      await BaseCrudService.create('recyclers', recyclerData);
      navigate('/services');
    } catch (error) {
      console.error('Error creating recycler:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedType === 'seller') {
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
              List Your Food Waste
            </h1>
            <p className="font-paragraph text-lg text-primary">
              Create a listing for your food waste and connect with recyclers and businesses
            </p>
          </div>

          <Card className="border-none shadow-lg bg-textwhite">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-bold text-primary uppercase">
                Listing Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSellerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="listingTitle" className="font-paragraph text-sm text-primary">
                      Listing Title *
                    </Label>
                    <Input
                      id="listingTitle"
                      value={sellerForm.listingTitle}
                      onChange={(e) => setSellerForm({...sellerForm, listingTitle: e.target.value})}
                      placeholder="e.g., Fresh Organic Vegetable Scraps"
                      required
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="wasteType" className="font-paragraph text-sm text-primary">
                      Waste Type *
                    </Label>
                    <Select value={sellerForm.wasteType} onValueChange={(value) => setSellerForm({...sellerForm, wasteType: value})}>
                      <SelectTrigger className="border-primary/20 focus:border-primary rounded-none">
                        <SelectValue placeholder="Select waste type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="organic">Organic Waste</SelectItem>
                        <SelectItem value="packaging">Packaging Materials</SelectItem>
                        <SelectItem value="dairy">Dairy Products</SelectItem>
                        <SelectItem value="produce">Produce Scraps</SelectItem>
                        <SelectItem value="bakery">Bakery Items</SelectItem>
                        <SelectItem value="meat">Meat/Protein</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity" className="font-paragraph text-sm text-primary">
                      Quantity *
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={sellerForm.quantity}
                      onChange={(e) => setSellerForm({...sellerForm, quantity: e.target.value})}
                      placeholder="100"
                      required
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="unitOfMeasure" className="font-paragraph text-sm text-primary">
                      Unit of Measure *
                    </Label>
                    <Select value={sellerForm.unitOfMeasure} onValueChange={(value) => setSellerForm({...sellerForm, unitOfMeasure: value})}>
                      <SelectTrigger className="border-primary/20 focus:border-primary rounded-none">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="tons">Tons</SelectItem>
                        <SelectItem value="liters">Liters</SelectItem>
                        <SelectItem value="gallons">Gallons</SelectItem>
                        <SelectItem value="pieces">Pieces</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="pricePerUnit" className="font-paragraph text-sm text-primary">
                      Price per Unit ($) *
                    </Label>
                    <Input
                      id="pricePerUnit"
                      type="number"
                      step="0.01"
                      value={sellerForm.pricePerUnit}
                      onChange={(e) => setSellerForm({...sellerForm, pricePerUnit: e.target.value})}
                      placeholder="5.00"
                      required
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="font-paragraph text-sm text-primary">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      value={sellerForm.location}
                      onChange={(e) => setSellerForm({...sellerForm, location: e.target.value})}
                      placeholder="City, State"
                      required
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="availableUntil" className="font-paragraph text-sm text-primary">
                      Available Until
                    </Label>
                    <Input
                      id="availableUntil"
                      type="datetime-local"
                      value={sellerForm.availableUntil}
                      onChange={(e) => setSellerForm({...sellerForm, availableUntil: e.target.value})}
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="font-paragraph text-sm text-primary">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={sellerForm.description}
                    onChange={(e) => setSellerForm({...sellerForm, description: e.target.value})}
                    placeholder="Describe your food waste, its condition, and any special handling requirements..."
                    required
                    rows={4}
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>

                {/* Photo Upload Section */}
                <div>
                  <Label className="font-paragraph text-sm text-primary">
                    Listing Photo (Optional)
                  </Label>
                  <div className="mt-2">
                    {sellerForm.listingImage ? (
                      <div className="relative inline-block">
                        <Image src={sellerForm.listingImage} alt="Listing preview" className="w-32 h-32 object-cover rounded border border-primary/20" />
                        <button
                          type="button"
                          onClick={() => removePhoto('seller')}
                          className="absolute -top-2 -right-2 bg-destructive text-destructiveforeground rounded-full p-1 hover:bg-destructive/90"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-primary/20 rounded p-6 text-center hover:border-primary/40 transition-colors">
                        <input
                          type="file"
                          id="listingPhoto"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'seller');
                          }}
                          className="hidden"
                        />
                        <label 
                          htmlFor="listingPhoto" 
                          className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                          <ImageIcon className="h-8 w-8 text-primary/60" />
                          <span className="font-paragraph text-sm text-primary/60">
                            Click to upload a photo of your listing
                          </span>
                          <span className="font-paragraph text-xs text-primary/40">
                            JPG, PNG up to 10MB
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
                  >
                    {isSubmitting ? (
                      <>Submitting...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Create Listing
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setSelectedType(null)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedType === 'recycler') {
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
              Register Your Recycling Company
            </h1>
            <p className="font-paragraph text-lg text-primary">
              Join our network of recycling partners and offer your services to food waste producers
            </p>
          </div>

          <Card className="border-none shadow-lg bg-textwhite">
            <CardHeader>
              <CardTitle className="font-heading text-2xl font-bold text-primary uppercase">
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRecyclerSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="recyclerName" className="font-paragraph text-sm text-primary">
                      Company Name *
                    </Label>
                    <Input
                      id="recyclerName"
                      value={recyclerForm.recyclerName}
                      onChange={(e) => setRecyclerForm({...recyclerForm, recyclerName: e.target.value})}
                      placeholder="e.g., Green Earth Recycling"
                      required
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location" className="font-paragraph text-sm text-primary">
                      Location *
                    </Label>
                    <Input
                      id="location"
                      value={recyclerForm.location}
                      onChange={(e) => setRecyclerForm({...recyclerForm, location: e.target.value})}
                      placeholder="City, State"
                      required
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="websiteUrl" className="font-paragraph text-sm text-primary">
                      Website URL
                    </Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={recyclerForm.websiteUrl}
                      onChange={(e) => setRecyclerForm({...recyclerForm, websiteUrl: e.target.value})}
                      placeholder="https://www.yourcompany.com"
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="font-paragraph text-sm text-primary">
                    Company Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={recyclerForm.description}
                    onChange={(e) => setRecyclerForm({...recyclerForm, description: e.target.value})}
                    placeholder="Describe your company, mission, and recycling capabilities..."
                    required
                    rows={4}
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>

                <div>
                  <Label htmlFor="wasteTypesAccepted" className="font-paragraph text-sm text-primary">
                    Waste Types Accepted *
                  </Label>
                  <Input
                    id="wasteTypesAccepted"
                    value={recyclerForm.wasteTypesAccepted}
                    onChange={(e) => setRecyclerForm({...recyclerForm, wasteTypesAccepted: e.target.value})}
                    placeholder="e.g., Organic waste, Packaging materials, Dairy products"
                    required
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>

                <div>
                  <Label htmlFor="productsInReturn" className="font-paragraph text-sm text-primary">
                    Products Offered in Return *
                  </Label>
                  <Textarea
                    id="productsInReturn"
                    value={recyclerForm.productsInReturn}
                    onChange={(e) => setRecyclerForm({...recyclerForm, productsInReturn: e.target.value})}
                    placeholder="Describe what products or services you offer in return for donations (e.g., compost, recycled materials, credits)..."
                    required
                    rows={3}
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>

                {/* Company Logo Upload Section */}
                <div>
                  <Label className="font-paragraph text-sm text-primary">
                    Company Logo (Optional)
                  </Label>
                  <div className="mt-2">
                    {recyclerForm.logo ? (
                      <div className="relative inline-block">
                        <Image src={recyclerForm.logo} alt="Company logo preview" className="w-32 h-32 object-cover rounded border border-primary/20" />
                        <button
                          type="button"
                          onClick={() => removePhoto('recycler')}
                          className="absolute -top-2 -right-2 bg-destructive text-destructiveforeground rounded-full p-1 hover:bg-destructive/90"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-primary/20 rounded p-6 text-center hover:border-primary/40 transition-colors">
                        <input
                          type="file"
                          id="companyLogo"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file, 'recycler');
                          }}
                          className="hidden"
                        />
                        <label 
                          htmlFor="companyLogo" 
                          className="cursor-pointer flex flex-col items-center space-y-2"
                        >
                          <ImageIcon className="h-8 w-8 text-primary/60" />
                          <span className="font-paragraph text-sm text-primary/60">
                            Click to upload your company logo
                          </span>
                          <span className="font-paragraph text-xs text-primary/40">
                            JPG, PNG up to 10MB
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none"
                  >
                    {isSubmitting ? (
                      <>Registering...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Register Company
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setSelectedType(null)}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
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
          <p className="font-paragraph text-lg text-primary max-w-3xl mx-auto">
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
              <p className="font-paragraph text-primary">
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
              <p className="font-paragraph text-primary">
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
          <p className="font-paragraph text-primary mb-4">
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