import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { slideUpVariants, staggerChildren, scaleOnHover } from "@/lib/animations";
import type { Post } from "@shared/schema";

export default function FeaturedPosts() {
  const { data: featuredPosts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="animate-pulse bg-gray-200 rounded-2xl h-96"></div>
            </div>
            <div className="space-y-8">
              <div className="animate-pulse bg-gray-200 rounded-2xl h-44"></div>
              <div className="animate-pulse bg-gray-200 rounded-2xl h-44"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredPosts || featuredPosts.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold font-sans text-charcoal mb-4">
            Featured Stories
          </h2>
          <p className="text-xl text-gray-600">No featured posts available at the moment.</p>
        </div>
      </section>
    );
  }

  const mainPost = featuredPosts[0];
  const secondaryPosts = featuredPosts.slice(1, 3);

  return (
    <section className="py-20 bg-white" data-testid="featured-posts-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-sans text-charcoal mb-4">
            Featured Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked articles from our most talented writers
          </p>
        </motion.div>
        
        {/* Featured Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="grid lg:grid-cols-3 gap-8 mb-12"
        >
          {/* Main Featured Post */}
          {mainPost && (
            <motion.div
              variants={slideUpVariants}
              className="lg:col-span-2"
              data-testid={`featured-post-main-${mainPost.id}`}
            >
              <Link href={`/post/${mainPost.id}`}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={scaleOnHover}
                  className="cursor-pointer"
                >
                  <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    <img
                      src={mainPost.imageUrl}
                      alt={mainPost.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className="bg-vibrant-coral text-white">
                          {mainPost.category}
                        </Badge>
                        <span className="text-gray-500 text-sm flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {mainPost.readTime} min read • {new Date(mainPost.createdAt!).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold font-sans text-charcoal mb-4 group-hover:text-deep-purple transition-colors duration-300">
                        {mainPost.title}
                      </h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        {mainPost.excerpt}
                      </p>
                      <div className="flex items-center">
                        <img
                          src={mainPost.authorAvatar}
                          alt={mainPost.authorName}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold text-charcoal">{mainPost.authorName}</p>
                          <p className="text-gray-500 text-sm">{mainPost.authorBio}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </motion.div>
          )}
          
          {/* Secondary Featured Posts */}
          <div className="space-y-8">
            {secondaryPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={slideUpVariants}
                data-testid={`featured-post-secondary-${post.id}`}
              >
                <Link href={`/post/${post.id}`}>
                  <motion.div
                    initial="rest"
                    whileHover="hover"
                    variants={scaleOnHover}
                    className="cursor-pointer"
                  >
                    <Card className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-deep-purple text-white text-sm">
                            {post.category}
                          </Badge>
                          <span className="text-gray-500 text-sm flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime} min read
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-sans text-charcoal mb-3 group-hover:text-deep-purple transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {post.excerpt.slice(0, 100)}...
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
