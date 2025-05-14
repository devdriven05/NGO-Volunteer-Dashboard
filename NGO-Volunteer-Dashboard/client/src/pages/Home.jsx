import axios from "axios";
import { ClipboardList, Globe, HandCoins, HeartHandshake, Sparkles, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "Amplify Your Impact",
      description: "Leverage our network of 50K+ donors and volunteers to scale your NGO's reach.",
      highlights: [
        "AI-powered donor matching",
        "Real-time impact analytics",
        "Customizable campaign pages"
      ],
      cta: "Launch Campaign",
      ctaLink: "/campaigns"
    },
    {
      icon: <ClipboardList className="w-8 h-8 text-purple-500" />,
      title: "Project Management",
      description: "End-to-end tools to plan, execute, and track your social initiatives.",
      highlights: [
        "Volunteer scheduling",
        "Milestone tracking",
        "Automated reporting"
      ],
      cta: "Start Project",
      ctaLink: "/projects"
    },
    {
      icon: <HandCoins className="w-8 h-8 text-purple-500" />,
      title: "Smart Fundraising",
      description: "Receive donations through 10+ payment methods with 0% platform fees.",
      highlights: [
        "Recurring donations",
        "Corporate matching",
        "Tax receipt automation"
      ],
      cta: "Fundraise Now",
      ctaLink: "/donations"
    }
  ];

  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, [setIsAuthenticated, setUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-purple-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-r from-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform <span className="text-purple-200">Good Intentions</span> Into Measurable Impact
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              The complete platform for NGOs to manage volunteers, donations, and projects at scale.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/projects/new"
                className="bg-white text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Create Your First Project
              </Link>
              <Link
                to="/demo"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all"
              >
                Watch Platform Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "8,200+", label: "NGOs Empowered" },
              { value: "$48M+", label: "Donations Processed" },
              { value: "320K+", label: "Volunteers" },
              { value: "95%", label: "Satisfaction Rate" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm border border-purple-50 hover:shadow-md transition-shadow">
                <p className="text-3xl font-bold text-purple-600">{stat.value}</p>
                <p className="text-purple-900/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full font-medium mb-4">
              Everything You Need
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              NGO Management <span className="text-purple-600">Reimagined</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Streamlined tools designed specifically for nonprofit organizations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-purple-50 hover:border-purple-100"
              >
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-5">{feature.description}</p>
                <ul className="space-y-3 mb-6">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start text-gray-700">
                      <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <Link
                  to={feature.ctaLink}
                  className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors"
                >
                  {feature.cta}
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HeartHandshake className="w-12 h-12 mx-auto mb-6 text-purple-300" />
            <blockquote className="text-xl md:text-2xl font-light leading-relaxed mb-8">
              "Within 3 months of using this platform, we doubled our volunteer base and increased monthly donations by 180%. The project management tools helped us coordinate relief efforts during the floods with military precision."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold">Sarah Chen</p>
                <p className="text-purple-200">Director, Hope Foundation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Globe className="w-14 h-14 mx-auto mb-6 text-purple-500" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Amplify Your NGO's Impact?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of organizations creating change worldwide
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Get Started for Free
              </Link>
              <Link
                to="/contact"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-full font-bold transition-colors"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;