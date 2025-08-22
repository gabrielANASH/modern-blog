import { motion } from "framer-motion";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { slideUpVariants, staggerChildren } from "@/lib/animations";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & Editor-in-Chief",
      bio: "Passionate about storytelling and connecting writers with readers worldwide.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
    {
      name: "Alex Chen",
      role: "Creative Director",
      bio: "Designing beautiful experiences that inspire and engage our community.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    },
    {
      name: "Maya Patel",
      role: "Community Manager",
      bio: "Building connections and fostering creativity within our writer community.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
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
                About ModernBlog
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                We're a platform dedicated to empowering writers and connecting them with readers 
                who crave authentic, inspiring stories from around the world.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="text-center mb-16"
            >
              <motion.h2 
                variants={slideUpVariants}
                className="text-4xl font-bold font-sans text-charcoal-gray mb-6"
              >
                Our Mission
              </motion.h2>
              <motion.p 
                variants={slideUpVariants}
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              >
                To create a vibrant community where every voice matters, every story has the power to inspire, 
                and creativity knows no bounds. We believe in the transformative power of authentic storytelling.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={slideUpVariants}>
                <Card className="text-center p-8 hover-lift">
                  <CardContent>
                    <div className="text-4xl mb-4">✍️</div>
                    <h3 className="text-xl font-bold mb-4">Empower Writers</h3>
                    <p className="text-gray-600">
                      Providing tools and platform for writers to share their stories with the world.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideUpVariants}>
                <Card className="text-center p-8 hover-lift">
                  <CardContent>
                    <div className="text-4xl mb-4">🌍</div>
                    <h3 className="text-xl font-bold mb-4">Connect Communities</h3>
                    <p className="text-gray-600">
                      Building bridges between diverse voices and perspectives from around the globe.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={slideUpVariants}>
                <Card className="text-center p-8 hover-lift">
                  <CardContent>
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-bold mb-4">Inspire Growth</h3>
                    <p className="text-gray-600">
                      Fostering personal and creative growth through meaningful storytelling.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-very-light-gray">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUpVariants}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-sans text-charcoal-gray mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind ModernBlog who make it all possible.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="grid md:grid-cols-3 gap-8"
            >
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={slideUpVariants}>
                  <Card className="text-center p-8 hover-lift">
                    <CardContent>
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                      />
                      <h3 className="text-xl font-bold text-charcoal-gray mb-2">
                        {member.name}
                      </h3>
                      <p className="text-bright-orange font-semibold mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideUpVariants}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold font-sans text-charcoal-gray mb-6">
                Our Values
              </h2>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-8"
            >
              <motion.div variants={slideUpVariants} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-neon-orange to-electric-purple rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  A
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-gray mb-2">Authenticity</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We value genuine, honest storytelling that reflects real experiences and perspectives.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={slideUpVariants} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-electric-purple to-neon-pink rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  I
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-gray mb-2">Inclusivity</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Our platform welcomes all voices, backgrounds, and perspectives with open arms.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={slideUpVariants} className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-neon-pink to-bright-orange rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  Q
                </div>
                <div>
                  <h3 className="text-xl font-bold text-charcoal-gray mb-2">Quality</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We're committed to maintaining high standards in content, design, and user experience.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}