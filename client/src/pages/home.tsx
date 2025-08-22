import { useEffect, useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import FeaturedPosts from "@/components/featured-posts";
import BlogPostsGrid from "@/components/blog-posts-grid";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";
import LoadingIndicator from "@/components/loading-indicator";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  useEffect(() => {
    // Add click listeners to buttons for loading indicator
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
      const handleClick = () => {
        if (
          !button.id?.includes("search") &&
          !button.id?.includes("menu") &&
          !button.className?.includes("category-filter")
        ) {
          showLoading();
        }
      };
      button.addEventListener("click", handleClick);
      return () => button.removeEventListener("click", handleClick);
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedPosts />
        <BlogPostsGrid />
        <NewsletterSection />
      </main>
      <Footer />
      <LoadingIndicator isVisible={isLoading} />
    </div>
  );
}
