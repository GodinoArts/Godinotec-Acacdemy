import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertWaitlistEntrySchema, type InsertWaitlistEntry } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Rocket, 
  Users, 
  Award, 
  CheckCircle, 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin,
  Shield,
  Send
} from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import logoPath from "@assets/ACADEMY_1750275088329.png";

export default function Home() {
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<InsertWaitlistEntry>({
    resolver: zodResolver(insertWaitlistEntrySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      wantsUpdates: false,
    },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: InsertWaitlistEntry) => {
      const response = await apiRequest("POST", "/api/waitlist", data);
      return response.json();
    },
    onSuccess: () => {
      setShowSuccess(true);
      form.reset();
      toast({
        title: "Welcome to the waitlist!",
        description: "We'll notify you as soon as Godinotec Academy launches.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "An error occurred while joining the waitlist.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertWaitlistEntry) => {
    waitlistMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={logoPath} alt="Godinotec Academy Logo" className="h-10 w-auto" />
            </div>
            <nav className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection("about")}
                className="text-gray-600 hover:text-brand-blue transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-brand-blue transition-colors"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-brand-blue transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Join the Future of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400">
                Technology Education
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Godinotec Academy is revolutionizing how professionals learn cutting-edge technology skills. 
              Be among the first to experience our innovative learning platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => scrollToSection("waitlist")}
                className="bg-brand-blue hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all"
                size="lg"
              >
                Join Waitlist
              </Button>
              <Button 
                variant="outline"
                onClick={() => scrollToSection("about")}
                className="border-2 border-white text-white hover:bg-white hover:text-slate-800 px-8 py-4 text-lg font-semibold transition-all"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Godinotec Academy?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine industry expertise with innovative teaching methods to deliver unparalleled learning experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gray-50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-brand-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Rocket className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cutting-Edge Curriculum</h3>
                <p className="text-gray-600">
                  Stay ahead with courses designed by industry leaders, covering the latest in AI, blockchain, cloud computing, and emerging technologies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gray-50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Expert Mentorship</h3>
                <p className="text-gray-600">
                  Learn directly from senior engineers and tech leaders from top companies. Get personalized guidance throughout your journey.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gray-50 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-white text-2xl" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Career Success</h3>
                <p className="text-gray-600">
                  Our graduates land roles at leading tech companies. Join our network of successful professionals and advance your career.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About Godinotec Academy
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Founded by industry veterans with decades of experience at top tech companies, Godinotec Academy bridges the gap between traditional education and the rapidly evolving tech landscape.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our mission is to democratize access to world-class technology education, empowering professionals to build the skills they need to thrive in the digital economy.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-emerald-500 mr-4" size={24} />
                  <span className="text-gray-700 font-medium">Industry-validated curriculum</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-emerald-500 mr-4" size={24} />
                  <span className="text-gray-700 font-medium">Hands-on project-based learning</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-emerald-500 mr-4" size={24} />
                  <span className="text-gray-700 font-medium">Lifetime community access</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-red-500 rounded-2xl p-8 text-white text-center">
                <GraduationCap className="mx-auto mb-6 opacity-90" size={80} />
                <h3 className="text-2xl font-bold mb-4">Launching Soon</h3>
                <p className="text-lg opacity-90">
                  Be the first to know when we open our doors to the next generation of tech professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Exclusive Waitlist
            </h2>
            <p className="text-xl text-gray-600">
              Be among the first to access Godinotec Academy when we launch. Early members get special benefits and priority enrollment.
            </p>
          </div>
          
          <Card className="bg-slate-50 shadow-xl">
            <CardContent className="p-8 md:p-12">
              {!showSuccess ? (
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        placeholder="Enter your first name"
                        className="mt-2"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        placeholder="Enter your last name"
                        className="mt-2"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      placeholder="Enter your email address"
                      className="mt-2"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="wantsUpdates"
                      {...form.register("wantsUpdates")}
                      className="mt-1"
                    />
                    <Label htmlFor="wantsUpdates" className="text-sm text-gray-600 leading-relaxed">
                      I'd like to receive updates about new courses, features, and exclusive content from Godinotec Academy.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-brand-blue hover:bg-blue-600 text-white font-semibold py-4 px-6 transition-all transform hover:scale-105 shadow-lg"
                    disabled={waitlistMutation.isPending}
                    size="lg"
                  >
                    {waitlistMutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Joining...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Send className="mr-2" size={20} />
                        Join Waitlist
                      </span>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-800 mb-4">Welcome to the waitlist!</h3>
                  <p className="text-emerald-700 text-lg">
                    We'll notify you as soon as Godinotec Academy launches.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm flex items-center justify-center">
              <Shield className="mr-2" size={16} />
              We respect your privacy. Your information will never be shared with third parties.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">500+</div>
              <div className="text-gray-300">Professionals on Waitlist</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-red mb-2">50+</div>
              <div className="text-gray-300">Industry Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-emerald-400 mb-2">25+</div>
              <div className="text-gray-300">Cutting-Edge Courses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <img src={logoPath} alt="Godinotec Academy Logo" className="h-8 w-auto mb-4" />
              <p className="text-gray-300 mb-6 max-w-md">
                Empowering the next generation of technology professionals with world-class education and mentorship.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaGithub size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <button 
                    onClick={() => scrollToSection("about")}
                    className="hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Mail className="mr-2" size={16} />
                  <span>hello@godinotec.academy</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2" size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="mr-2 mt-1" size={16} />
                  <span>San Francisco, CA<br />United States</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Godinotec Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
