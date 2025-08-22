import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Calendar, Heart, Share2 } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { slideUpVariants } from "@/lib/animations";
import type { Post } from "@shared/schema";

export default function PostPage() {
  const params = useParams();
  const postId = params.id as string;

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ["/api/posts", postId],
    enabled: !!postId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded-2xl mb-8"></div>
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-3xl font-bold text-charcoal-gray mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-8">The post you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link href="/blog">
              <Button variant="ghost" className="mb-4" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </motion.div>

          {/* Post Header */}
          <motion.header
            initial="hidden"
            animate="visible"
            variants={slideUpVariants}
            className="mb-8"
            data-testid="post-header"
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-vibrant-coral text-white">
                {post.category}
              </Badge>
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(post.createdAt!).toLocaleDateString()}
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold font-sans text-charcoal-gray mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between mb-8 p-6 bg-soft-gray rounded-2xl">
              <div className="flex items-center">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-charcoal-gray text-lg">{post.authorName}</p>
                  <p className="text-gray-600">{post.authorBio}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">{post.readTime} min read</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <Button variant="ghost" size="sm" data-testid="button-share">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              data-testid="post-image"
            />
          </motion.div>

          {/* Post Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg max-w-none"
            data-testid="post-content"
          >
            <div className="text-xl text-gray-700 leading-relaxed mb-8">
              {post.excerpt}
            </div>
            
            <div className="text-gray-700 leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Post Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-8 bg-light-lavender rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-charcoal-gray mb-2">
                  Enjoyed this article?
                </h3>
                <p className="text-gray-600">
                  Share it with others or show your appreciation
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="border-dusty-pink text-dusty-pink hover:bg-dusty-pink hover:text-white"
                  data-testid="button-like-post"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like ({post.likes})
                </Button>
                <Button 
                  className="bg-electric-blue text-white hover:bg-opacity-90"
                  data-testid="button-share-post"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-20 h-20 rounded-full mr-6"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-charcoal-gray mb-2">
                      {post.authorName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.authorBio}
                    </p>
                    <Button variant="outline" data-testid="button-follow-author">
                      Follow {post.authorName}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
