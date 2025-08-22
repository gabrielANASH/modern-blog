import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Post } from "@shared/schema";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults, isLoading } = useQuery<Post[]>({
    queryKey: ["/api/search", { q: searchQuery }],
    enabled: searchQuery.length > 2,
  });

  const popularSearches = [
    { term: "Web Design", category: "Design" },
    { term: "Photography", category: "Art" },
    { term: "Travel", category: "Travel" },
    { term: "Lifestyle", category: "Lifestyle" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
          data-testid="search-overlay"
        >
          <div className="flex items-center justify-center min-h-screen p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8"
              data-testid="search-modal"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-sans text-charcoal">
                  Search Posts
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  data-testid="button-close-search"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Search Input */}
              <div className="relative mb-6">
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-4 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-deep-purple focus:border-transparent text-lg"
                  data-testid="input-search"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* Search Results */}
              {searchQuery.length > 2 && (
                <div className="mb-6">
                  {isLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-purple mx-auto"></div>
                      <p className="text-gray-500 mt-2">Searching...</p>
                    </div>
                  ) : searchResults && searchResults.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500 font-medium">
                        Found {searchResults.length} result(s):
                      </p>
                      {searchResults.map((post) => (
                        <Link key={post.id} href={`/post/${post.id}`}>
                          <motion.div
                            whileHover={{ x: 5 }}
                            onClick={onClose}
                            className="p-4 border border-gray-100 rounded-lg hover:border-deep-purple transition-all duration-300 cursor-pointer"
                            data-testid={`search-result-${post.id}`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-charcoal mb-1">
                                  {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                  {post.excerpt}
                                </p>
                                <Badge variant="secondary" className="text-xs">
                                  {post.category}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No results found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* Popular Searches */}
              {searchQuery.length <= 2 && (
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-3">
                    Popular searches:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search) => (
                      <motion.button
                        key={search.term}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchQuery(search.term)}
                        className="px-3 py-1 bg-soft-lavender text-deep-purple rounded-full text-sm hover:bg-deep-purple hover:text-white transition-all duration-300"
                        data-testid={`popular-search-${search.term.toLowerCase().replace(' ', '-')}`}
                      >
                        {search.term}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
