import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Plus, User, Home, Store, Recycle, BarChart3 } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Marketplace', href: '/marketplace', icon: Store },
    { name: 'Services', href: '/services', icon: Recycle },
    { name: 'Impact', href: '/impact', icon: BarChart3 },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-textwhite border-b border-primary/10 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[100rem] mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-black text-primary uppercase tracking-wide hover:text-primary/80 transition-colors">
            Food2
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 font-paragraph text-sm transition-colors ${
                    isActive(item.href)
                      ? 'text-primary font-bold'
                      : 'text-primary/70 hover:text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none">
              <Link to="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none">
              <Link to="/list-waste">
                <Plus className="mr-2 h-4 w-4" />
                List Waste
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="sm" className="border-primary text-primary rounded-none">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-textwhite">
              <div className="flex flex-col space-y-6 mt-6">
                <Link to="/" className="font-heading text-xl font-black text-primary uppercase tracking-wide">
                  Food2
                </Link>
                
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 font-paragraph text-base transition-colors ${
                          isActive(item.href)
                            ? 'text-primary font-bold'
                            : 'text-primary/70 hover:text-primary'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="flex flex-col space-y-3 pt-6 border-t border-primary/10">
                  <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-none justify-start">
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-none justify-start">
                    <Link to="/list-waste" onClick={() => setIsOpen(false)}>
                      <Plus className="mr-2 h-4 w-4" />
                      List Waste
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}