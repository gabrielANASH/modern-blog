import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { slideUpVariants, staggerChildren } from "@/lib/animations";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@modernblog.com",
      description: "Send us an email for general inquiries",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Available Monday to Friday, 9 AM - 6 PM",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "San Francisco, CA",
      description: "Our headquarters in the heart of the city",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-electric-purple to-neon-pink">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUpVariants}
            >
              <h1 className="text-5xl lg:text-6xl font-bold font-sans text-white mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Have a question, suggestion, or just want to say hello? 
                We'd love to hear from you and help in any way we can.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={slideUpVariants}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-charcoal-gray">
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Your full name"
                                    data-testid="input-name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    data-testid="input-email"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="What's this about?"
                                  data-testid="input-subject"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us more about your inquiry..."
                                  className="min-h-32"
                                  data-testid="input-message"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-gradient-to-r from-neon-orange to-electric-purple text-white font-bold py-3 hover:scale-105 transition-all duration-300"
                          data-testid="button-send"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerChildren}
                className="space-y-6"
              >
                <motion.div variants={slideUpVariants}>
                  <h3 className="text-2xl font-bold text-charcoal-gray mb-6">
                    Contact Information
                  </h3>
                </motion.div>

                {contactInfo.map((info, index) => (
                  <motion.div key={index} variants={slideUpVariants}>
                    <Card className="hover-lift">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-electric-purple to-neon-pink rounded-full flex items-center justify-center">
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-bold text-charcoal-gray mb-1">
                              {info.title}
                            </h4>
                            <p className="text-bright-orange font-semibold mb-1">
                              {info.content}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {info.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Office Hours */}
                <motion.div variants={slideUpVariants}>
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="font-bold text-charcoal-gray mb-4">
                        Office Hours
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Monday - Friday</span>
                          <span className="font-semibold">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Saturday</span>
                          <span className="font-semibold">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sunday</span>
                          <span className="font-semibold">Closed</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-very-light-gray">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUpVariants}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-sans text-charcoal-gray mb-6">
                Frequently Asked Questions
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-6"
            >
              <motion.div variants={slideUpVariants}>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-charcoal-gray mb-2">
                      How can I submit a story for publication?
                    </h4>
                    <p className="text-gray-600">
                      You can submit your story using our "Write Story" feature. Simply click the button 
                      in the navigation menu and fill out the submission form with your content.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideUpVariants}>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-charcoal-gray mb-2">
                      What types of content do you accept?
                    </h4>
                    <p className="text-gray-600">
                      We welcome a wide variety of content including personal stories, how-to guides, 
                      industry insights, travel experiences, and creative writing across multiple categories.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideUpVariants}>
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-charcoal-gray mb-2">
                      How long does it take to get a response?
                    </h4>
                    <p className="text-gray-600">
                      We typically respond to all inquiries within 24-48 hours during business days. 
                      For urgent matters, please mention it in your subject line.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}