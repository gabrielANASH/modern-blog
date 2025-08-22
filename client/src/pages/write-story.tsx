import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slideUpVariants } from "@/lib/animations";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertPostSchema, type InsertPost } from "@shared/schema";

const categories = ["Design", "Technology", "Travel", "Lifestyle", "Photography", "Art", "Wellness", "Food", "Business"];

export default function WriteStory() {
  const [isPreview, setIsPreview] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<InsertPost>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      category: "",
      imageUrl: "",
      authorName: "",
      authorAvatar: "",
      authorBio: "",
      readTime: 5,
      featured: "false",
    },
  });

  const createPostMutation = useMutation({
    mutationFn: async (data: InsertPost) => {
      const response = await apiRequest("POST", "/api/posts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Story published!",
        description: "Your story has been successfully published.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: "Publishing failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertPost) => {
    createPostMutation.mutate(data);
  };

  const watchedData = form.watch();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header */}
        <section className="py-12 bg-gradient-to-r from-electric-purple to-neon-pink">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUpVariants}
              className="text-center"
            >
              <Link href="/">
                <Button variant="ghost" className="mb-4 text-white hover:text-white/80" data-testid="button-back">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-4xl lg:text-5xl font-bold font-sans text-white mb-4">
                Write Your Story
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Share your thoughts, experiences, and ideas with the world
              </p>
            </motion.div>
          </div>
        </section>

        {/* Write Story Form */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Editor */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideUpVariants}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Story Editor</span>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={!isPreview ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIsPreview(false)}
                          data-testid="button-edit-mode"
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant={isPreview ? "default" : "outline"}
                          size="sm"
                          onClick={() => setIsPreview(true)}
                          data-testid="button-preview-mode"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {!isPreview ? (
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your story title..."
                                    className="text-lg font-semibold"
                                    data-testid="input-title"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="excerpt"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Excerpt</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Brief description of your story..."
                                    className="min-h-20"
                                    data-testid="input-excerpt"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="category"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Category</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger data-testid="select-category">
                                        <SelectValue placeholder="Select category" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="readTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Read Time (minutes)</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min="1"
                                      max="60"
                                      data-testid="input-read-time"
                                      {...field}
                                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Featured Image URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://example.com/image.jpg"
                                    data-testid="input-image-url"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Content</FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="Write your story here..."
                                    className="min-h-64"
                                    data-testid="input-content"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="authorName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Author Name</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Your name"
                                      data-testid="input-author-name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="authorBio"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Author Bio</FormLabel>
                                  <FormControl>
                                    <Input
                                      placeholder="Brief bio"
                                      data-testid="input-author-bio"
                                      {...field}
                                      value={field.value || ""}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="authorAvatar"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Author Avatar URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://example.com/avatar.jpg"
                                    data-testid="input-author-avatar"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            disabled={createPostMutation.isPending}
                            className="w-full bg-gradient-to-r from-neon-orange to-electric-purple text-white font-bold py-3 hover:scale-105 transition-all duration-300"
                            data-testid="button-publish"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {createPostMutation.isPending ? "Publishing..." : "Publish Story"}
                          </Button>
                        </form>
                      </Form>
                    ) : (
                      /* Preview */
                      <div className="space-y-6">
                        {watchedData.imageUrl && (
                          <img
                            src={watchedData.imageUrl}
                            alt={watchedData.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                        <div>
                          <h2 className="text-2xl font-bold mb-2">{watchedData.title || "Your Story Title"}</h2>
                          <p className="text-gray-600 mb-4">{watchedData.excerpt || "Your story excerpt will appear here..."}</p>
                          <div className="prose max-w-none">
                            {watchedData.content ? (
                              watchedData.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4">{paragraph}</p>
                              ))
                            ) : (
                              <p className="text-gray-500 italic">Your story content will appear here...</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Tips & Guidelines */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={slideUpVariants}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">📝 Great Story Elements</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Compelling headline that grabs attention</li>
                        <li>• Clear and engaging introduction</li>
                        <li>• Well-structured content with headings</li>
                        <li>• Personal anecdotes and examples</li>
                        <li>• Strong conclusion that inspires action</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">🎯 SEO Best Practices</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Use relevant keywords naturally</li>
                        <li>• Write descriptive excerpts</li>
                        <li>• Choose high-quality images</li>
                        <li>• Keep paragraphs short and readable</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">💡 Content Ideas</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Share your expertise and experiences</li>
                        <li>• Create how-to guides and tutorials</li>
                        <li>• Review products or services</li>
                        <li>• Tell inspiring personal stories</li>
                        <li>• Discuss industry trends and insights</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}