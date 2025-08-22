import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { slideUpVariants, floatVariants } from "@/lib/animations";

export default function HeroSection() {
  return (
    <section className="pt-16 bg-gradient-to-br from-soft-lavender via-white to-sage-green min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideUpVariants}
            data-testid="hero-content"
          >
            <h1 className="text-5xl lg:text-7xl font-bold font-sans text-charcoal leading-tight mb-6">
              Stories That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-coral to-deep-purple">
                Inspire
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing stories, insights, and ideas from creators around the world. 
              Join our community of passionate readers and writers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/blog">
                <Button
                  size="lg"
                  className="px-8 py-4 bg-deep-purple text-white rounded-xl font-semibold hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  data-testid="button-start-reading"
                >
                  Start Reading
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-charcoal text-charcoal rounded-xl font-semibold hover:bg-charcoal hover:text-white transition-all duration-300"
                data-testid="button-write-story"
              >
                Write a Story
              </Button>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={floatVariants}
            data-testid="hero-image"
          >
            <img
              src="https://images.unsplash.com/photo-1542728928-1413d1894ed1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Modern workspace with laptop and plants"
              className="rounded-3xl shadow-2xl w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
