import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Building, Mail, MapPin, Phone, Save } from 'lucide-react';
import { useMember } from '@/integrations';

export default function ProfilePage() {
  const { member } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [userType, setUserType] = useState<'seller' | 'recycler' | ''>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    location: '',
    description: '',
    wasteTypes: '',
    services: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        firstName: member.contact?.firstName || '',
        lastName: member.contact?.lastName || '',
        email: member.loginEmail || '',
        phone: member.contact?.phones?.[0] || '',
        company: '',
        location: '',
        description: '',
        wasteTypes: '',
        services: ''
      });
    }
  }, [member]);

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log('Saving profile data:', formData, 'User type:', userType);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-backgroundlight">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl md:text-5xl font-black text-primary uppercase mb-4">
            My Profile
          </h1>
          <p className="font-paragraph text-lg text-primary">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <Card className="border-none shadow-lg bg-textwhite">
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-primary-foreground" />
              </div>
              <CardTitle className="font-heading text-xl font-bold text-primary">
                {formData.firstName} {formData.lastName}
              </CardTitle>
              <p className="font-paragraph text-sm text-primary">
                {userType ? (userType === 'seller' ? 'Food Waste Seller' : 'Recycling Partner') : 'Platform Member'}
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-paragraph text-sm text-primary">{formData.email}</span>
              </div>
              {formData.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-paragraph text-sm text-primary">{formData.phone}</span>
                </div>
              )}
              {formData.company && (
                <div className="flex items-center space-x-2">
                  <Building className="h-4 w-4 text-primary" />
                  <span className="font-paragraph text-sm text-primary">{formData.company}</span>
                </div>
              )}
              {formData.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-paragraph text-sm text-primary">{formData.location}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Type Selection */}
            <Card className="border-none shadow-lg bg-textwhite">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-bold text-primary uppercase">
                  Account Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={userType} onValueChange={(value: 'seller' | 'recycler') => setUserType(value)} disabled={!isEditing}>
                  <SelectTrigger className="border-primary/20 focus:border-primary rounded-none">
                    <SelectValue placeholder="Select your account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="seller">Food Waste Seller</SelectItem>
                    <SelectItem value="recycler">Recycling Partner</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-none shadow-lg bg-textwhite">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-xl font-bold text-primary uppercase">
                  Basic Information
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="font-paragraph text-sm text-primary">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      disabled={!isEditing}
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="font-paragraph text-sm text-primary">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      disabled={!isEditing}
                      className="border-primary/20 focus:border-primary rounded-none"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="font-paragraph text-sm text-primary">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    disabled={!isEditing}
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="font-paragraph text-sm text-primary">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    disabled={!isEditing}
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="font-paragraph text-sm text-primary">Company</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    disabled={!isEditing}
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="font-paragraph text-sm text-primary">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    disabled={!isEditing}
                    className="border-primary/20 focus:border-primary rounded-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            {userType && (
              <Card className="border-none shadow-lg bg-textwhite">
                <CardHeader>
                  <CardTitle className="font-heading text-xl font-bold text-primary uppercase">
                    {userType === 'seller' ? 'Seller Information' : 'Recycler Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="description" className="font-paragraph text-sm text-primary">
                      {userType === 'seller' ? 'Business Description' : 'Company Description'}
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      disabled={!isEditing}
                      className="border-primary/20 focus:border-primary rounded-none"
                      rows={3}
                    />
                  </div>

                  {userType === 'seller' && (
                    <div>
                      <Label htmlFor="wasteTypes" className="font-paragraph text-sm text-primary">
                        Types of Food Waste You Produce
                      </Label>
                      <Input
                        id="wasteTypes"
                        value={formData.wasteTypes}
                        onChange={(e) => setFormData({...formData, wasteTypes: e.target.value})}
                        disabled={!isEditing}
                        placeholder="e.g., Organic waste, Packaging materials, etc."
                        className="border-primary/20 focus:border-primary rounded-none"
                      />
                    </div>
                  )}

                  {userType === 'recycler' && (
                    <div>
                      <Label htmlFor="services" className="font-paragraph text-sm text-primary">
                        Services Offered
                      </Label>
                      <Textarea
                        id="services"
                        value={formData.services}
                        onChange={(e) => setFormData({...formData, services: e.target.value})}
                        disabled={!isEditing}
                        placeholder="Describe the recycling services you provide..."
                        className="border-primary/20 focus:border-primary rounded-none"
                        rows={3}
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end">
                <Button 
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}