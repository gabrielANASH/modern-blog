import Navigation from "@/components/navigation";
import BlogPostsGrid from "@/components/blog-posts-grid";
import NewsletterSection from "@/components/newsletter-section";
import Footer from "@/components/footer";

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        {/* Page Header */}
        <section className="py-20 bg-gradient-to-br from-light-lavender via-white to-off-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold font-sans text-charcoal-gray mb-6">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-coral to-dusty-pink">Articles</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our complete collection of stories, insights, and ideas from talented writers around the world.
            </p>
          </div>
        </section>
        
        <BlogPostsGrid />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
