import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Clock, Heart, ArrowDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { slideUpVariants, staggerChildren, scaleOnHover } from "@/lib/animations";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Post } from "@shared/schema";

const categories = ["All", "Design", "Technology", "Travel", "Lifestyle", "Photography", "Art", "Wellness", "Food", "Business"];

export default function BlogPostsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/posts", { category: selectedCategory === "All" ? undefined : selectedCategory }],
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const response = await apiRequest("POST", `/api/posts/${postId}/like`);
      return response.json();
    },
    onSuccess: (data, postId) => {
      setLikedPosts(prev => new Set([...Array.from(prev), postId]));
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post liked!",
        description: "Thanks for showing your appreciation.",
      });
    },
  });

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!likedPosts.has(postId)) {
      likeMutation.mutate(postId);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-very-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-48 mb-4"></div>
                <div className="bg-gray-200 h-4 rounded mb-2"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-very-light-gray" data-testid="blog-posts-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold font-sans text-charcoal-gray mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">Fresh content from our community</p>
          </div>
          <div className="hidden md:flex items-center space-x-4 mt-4 md:mt-0">
            <Button className="px-6 py-3 bg-electric-blue text-white rounded-xl font-semibold hover:bg-opacity-90">
              All Categories
            </Button>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-dusty-pink text-white"
                  : "bg-white text-charcoal-gray hover:bg-dusty-pink hover:text-white"
              }`}
              data-testid={`category-filter-${category.toLowerCase()}`}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={slideUpVariants}
                  data-testid={`post-card-${post.id}`}
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
                            <Badge className="bg-vibrant-coral text-white">
                              {post.category}
                            </Badge>
                            <span className="text-gray-500 text-sm flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {post.readTime} min read • {new Date(post.createdAt!).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold font-sans text-charcoal-gray mb-3 group-hover:text-dusty-pink transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <img
                                src={post.authorAvatar}
                                alt={post.authorName}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <span className="text-sm font-medium text-charcoal-gray">
                                {post.authorName}
                              </span>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleLike(post.id, e)}
                              className={`flex items-center gap-1 transition-colors duration-300 ${
                                likedPosts.has(post.id)
                                  ? "text-vibrant-coral"
                                  : "text-gray-400 hover:text-vibrant-coral"
                              }`}
                              data-testid={`button-like-${post.id}`}
                            >
                              <Heart
                                className={`w-4 h-4 ${likedPosts.has(post.id) ? "fill-current" : ""}`}
                              />
                              <span className="text-sm">{post.likes || 0}</span>
                            </motion.button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
            
            {/* Load More */}
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 border-2 border-dusty-pink text-dusty-pink rounded-xl font-semibold hover:bg-dusty-pink hover:text-white transition-all duration-300 inline-flex items-center"
                data-testid="button-load-more"
              >
                <span>Load More Articles</span>
                <ArrowDown className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No posts found in the {selectedCategory} category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
