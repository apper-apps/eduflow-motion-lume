import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "Sparkles",
      title: "AI-Powered Content",
      description: "Generate personalized learning content with advanced AI algorithms tailored to each student's needs."
    },
    {
      icon: "Users",
      title: "Real-time Collaboration",
      description: "Enable seamless collaboration between students, instructors, and administrators in real-time."
    },
    {
      icon: "BarChart3",
      title: "Advanced Analytics",
      description: "Track learning progress with detailed analytics and insights to optimize educational outcomes."
    },
    {
      icon: "Shield",
      title: "Multi-tenant Management",
      description: "Secure, scalable platform supporting multiple institutions with role-based access control."
    }
  ];

  const stats = [
    { label: "Active Students", value: "50K+" },
    { label: "Courses Created", value: "10K+" },
    { label: "AI Content Generated", value: "1M+" },
    { label: "Institutions", value: "500+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <ApperIcon name="GraduationCap" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">EduFlow Pro</h1>
            </div>
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="primary"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-8">
            <ApperIcon name="Sparkles" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Education Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Transform Education with{" "}
            <span className="gradient-text">Intelligent Learning</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            EduFlow Pro delivers personalized, AI-powered educational experiences that adapt to every learner's needs. 
            Create, collaborate, and scale education like never before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              onClick={() => navigate("/dashboard")}
              variant="primary"
              size="lg"
              icon="ArrowRight"
              iconPosition="right"
            >
              Start Learning
            </Button>
            <Button 
              variant="secondary"
              size="lg"
              icon="Play"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 font-medium">
                  {stat.label}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Powerful Features for Modern Education
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to create, manage, and deliver exceptional educational experiences
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 group hover:shadow-elevated transition-all duration-300">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={feature.icon} size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to revolutionize your educational experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of educators and students who are already transforming learning with EduFlow Pro
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                onClick={() => navigate("/dashboard")}
                variant="primary"
                size="lg"
                icon="Sparkles"
              >
                Get Started for Free
              </Button>
              <Button 
                variant="secondary"
                size="lg"
                icon="MessageCircle"
              >
                Contact Sales
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <ApperIcon name="GraduationCap" size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">EduFlow Pro</span>
          </div>
          <p className="text-gray-400 mb-6">
            Empowering education through intelligent technology
          </p>
          <p className="text-sm text-gray-500">
            © 2024 EduFlow Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;