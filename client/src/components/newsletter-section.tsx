import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { slideUpVariants } from "@/lib/animations";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest("POST", "/api/subscribe", { email });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter. Check your email for confirmation.",
      });
      setEmail("");
    },
    onError: (error: any) => {
      toast({
        title: "Subscription failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      subscribeMutation.mutate(email);
    }
  };

  return (
    <section 
      className="py-20 bg-gradient-to-br from-deep-purple to-vibrant-coral"
      data-testid="newsletter-section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUpVariants}
        >
          <h2 className="text-4xl lg:text-5xl font-bold font-sans text-white mb-6">
            Never Miss a Story
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get the latest articles, insights, and exclusive content delivered straight to your inbox. 
            Join over 10,000 readers who trust us.
          </p>
          
          {/* Newsletter Form */}
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20"
            data-testid="newsletter-form"
          >
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
                required
                data-testid="input-email"
              />
              <Button
                type="submit"
                disabled={subscribeMutation.isPending}
                className="w-full px-8 py-4 bg-white text-deep-purple rounded-xl font-bold hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
                data-testid="button-subscribe"
              >
                {subscribeMutation.isPending ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </div>
            <p className="text-white/70 text-sm mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </form>
          
          {/* Social Proof */}
          <div className="mt-8 flex justify-center items-center space-x-8 text-white/80">
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span className="text-sm">10,000+ Subscribers</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 mr-2" />
              <span className="text-sm">4.9/5 Rating</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
