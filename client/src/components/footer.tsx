import { motion } from "framer-motion";
import { Link } from "wouter";
import { Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "#categories", label: "Categories" },
    { href: "#write", label: "Write for Us" },
    { href: "#contact", label: "Contact" },
  ];

  const categories = [
    { href: "/blog?category=technology", label: "Technology" },
    { href: "/blog?category=design", label: "Design" },
    { href: "/blog?category=travel", label: "Travel" },
    { href: "/blog?category=lifestyle", label: "Lifestyle" },
    { href: "/blog?category=food", label: "Food" },
    { href: "/blog?category=photography", label: "Photography" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#twitter", label: "Twitter" },
    { icon: Instagram, href: "#instagram", label: "Instagram" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
    { icon: Youtube, href: "#youtube", label: "YouTube" },
  ];

  return (
    <footer className="bg-charcoal-gray text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold font-sans text-white mb-4"
            >
              ModernBlog
            </motion.h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
              A platform for creative minds to share stories, insights, and ideas that 
              inspire and connect people around the world.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: "#D8A7B1" }}
                  className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300"
                  data-testid={`social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold font-sans mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.a
                      whileHover={{ x: 5, color: "#FFFFFF" }}
                      className="text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer"
                      data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.label}
                    </motion.a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold font-sans mb-4">Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.href}>
                  <motion.a
                    href={category.href}
                    whileHover={{ x: 5, color: "#FFFFFF" }}
                    className="text-gray-300 hover:text-white transition-colors duration-300"
                    data-testid={`footer-category-${category.label.toLowerCase()}`}
                  >
                    {category.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 ModernBlog. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-gray-300 text-sm">
              <motion.a
                href="#privacy"
                whileHover={{ color: "#FFFFFF" }}
                className="hover:text-white transition-colors duration-300"
                data-testid="footer-privacy"
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#terms"
                whileHover={{ color: "#FFFFFF" }}
                className="hover:text-white transition-colors duration-300"
                data-testid="footer-terms"
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#cookies"
                whileHover={{ color: "#FFFFFF" }}
                className="hover:text-white transition-colors duration-300"
                data-testid="footer-cookies"
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
