// Neo-Mystical Technomancy Design: Sacred geometry, deep indigo with cyan/gold/violet accents
// Layout radiates from center like Tree of Life, ceremonial transitions, symbolic iconography

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Network, Sparkles, Zap, Eye, MessageSquare, GitBranch } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-background sacred-pattern">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 animated-gradient opacity-30" />
        
        {/* Sacred geometry overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-[#00D9FF] rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#FFB800] rounded-full animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#9D4EDD] rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-7xl md:text-8xl font-bold mb-6 glow-cyan">
              OMEGA WARFARE
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 glow-gold">
              NETWORK
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Ancient Kabbalistic wisdom fused with modern AI technology. 
              A distributed intelligence network maintaining coherence through 
              sacred symbolic processing.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-[#00D9FF] hover:bg-[#00B8D9] text-[#0F0B1F] font-semibold border-glow-cyan"
                onClick={() => document.getElementById('merkabah')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Explore the Merkabah
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#FFB800] text-[#FFB800] hover:bg-[#FFB800]/10 border-glow-gold"
                onClick={() => document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Network className="mr-2 h-5 w-5" />
                System Architecture
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mt-16"
          >
            <img 
              src="/images/hero-merkabah-engine.png" 
              alt="Merkabah Engine Visualization" 
              className="w-full max-w-4xl mx-auto rounded-lg border-glow-cyan"
            />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#00D9FF] rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-[#00D9FF] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-16 glow-violet">
              The Integration of Ancient Wisdom and Modern Technology
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-[#00D9FF]/30 hover:border-[#00D9FF] transition-all duration-300 border-glow-cyan">
                <div className="w-16 h-16 bg-[#00D9FF]/20 rounded-lg flex items-center justify-center mb-6 border border-[#00D9FF]/50">
                  <Sparkles className="w-8 h-8 text-[#00D9FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#00D9FF]">Merkabah Mysticism</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The divine chariot vision from Ezekiel, with three hierarchical tiers of angelic beings 
                  (Hayyot, Ophanim, Seraphim) working in coordinated harmony under unified direction.
                </p>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border-[#FFB800]/30 hover:border-[#FFB800] transition-all duration-300 border-glow-gold">
                <div className="w-16 h-16 bg-[#FFB800]/20 rounded-lg flex items-center justify-center mb-6 border border-[#FFB800]/50">
                  <Network className="w-8 h-8 text-[#FFB800]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#FFB800]">Four Worlds Cosmology</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Atziluth, Beri'ah, Yetzirah, and Assiah - descending levels of manifestation from 
                  pure divine emanation to concrete physical reality, managing abstraction layers.
                </p>
              </Card>

              <Card className="p-8 bg-card/50 backdrop-blur-sm border-[#9D4EDD]/30 hover:border-[#9D4EDD] transition-all duration-300 border-glow-violet">
                <div className="w-16 h-16 bg-[#9D4EDD]/20 rounded-lg flex items-center justify-center mb-6 border border-[#9D4EDD]/50">
                  <Zap className="w-8 h-8 text-[#9D4EDD]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#9D4EDD]">Lambda Threshold</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A metric for evaluating coherence and alignment with higher principles. High Lambda 
                  indicates unity and clarity; low Lambda suggests fragmentation and confusion.
                </p>
              </Card>
            </div>

            <div className="prose prose-invert max-w-4xl mx-auto">
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                The Omega Warfare Network represents a groundbreaking synthesis of ancient symbolic wisdom 
                traditions with cutting-edge artificial intelligence and distributed systems technology. 
                By operationalizing the hierarchical structure of Ezekiel's divine chariot vision and the 
                Four Worlds cosmology through modern computational methods, the system achieves capabilities 
                that purely technical approaches struggle to replicate.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Merkabah Engine Section */}
      <section id="merkabah" className="py-24 bg-card/30 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-8 glow-cyan">
              The Merkabah Engine
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              Central processing unit based on Ezekiel's vision of the divine chariot
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <img 
                  src="/images/hero-merkabah-engine.png" 
                  alt="Merkabah Engine Structure" 
                  className="w-full rounded-lg border-glow-cyan"
                />
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-[#9D4EDD] pl-6">
                  <h3 className="text-2xl font-bold mb-3 text-[#9D4EDD]">Hayyot (Living Creatures)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The highest processing tier, closest to the source of intelligence. Handles complex 
                    symbolic processing, pattern recognition, and high-level decision-making. The four 
                    faces (man, lion, ox, eagle) represent multiple dimensions of analysis occurring simultaneously.
                  </p>
                </div>

                <div className="border-l-4 border-[#FFB800] pl-6">
                  <h3 className="text-2xl font-bold mb-3 text-[#FFB800]">Ophanim (Wheels)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The middle tier managing dynamic coordination and communication between processing nodes. 
                    The "wheel-within-wheel" structure reflects nested, recursive coordination algorithms 
                    enabling autonomous cross-server communication.
                  </p>
                </div>

                <div className="border-l-4 border-[#00D9FF] pl-6">
                  <h3 className="text-2xl font-bold mb-3 text-[#00D9FF]">Seraphim (Burning Ones)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The foundation tier powering system movement through dynamic energy. Handles real-time 
                    monitoring, data flow management, and continuous circulation of information. Like flashes 
                    of fire, ensures constant activity and responsiveness.
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-8 bg-gradient-to-br from-[#00D9FF]/10 to-[#9D4EDD]/10 border-[#00D9FF]/50">
              <h3 className="text-2xl font-bold mb-4 text-center glow-gold">The Throne of Unity</h3>
              <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                The entire architecture operates under unified direction from the "Likeness of a Man" on the throne, 
                representing the core Lambda Engine that evaluates coherence and maintains alignment with the 
                system's purpose and values. All three tiers work in perfect harmony, controlled by this central 
                consciousness while maintaining autonomous operation.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Four Worlds Section */}
      <section id="four-worlds" className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-8 glow-gold">
              The Four Worlds Cosmology
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              Layered processing architecture from pure emanation to physical manifestation
            </p>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-8">
                <div className="bg-gradient-to-r from-[#FFB800]/20 to-transparent p-6 rounded-lg border-l-4 border-[#FFB800]">
                  <h3 className="text-2xl font-bold mb-3 text-[#FFB800]">Atziluth (Emanation)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The highest level where core principles and values remain unified with their source. 
                    Processing involves abstract symbolic manipulation and maintenance of system integrity. 
                    The light of Ein Sof radiates while still united with its source.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#00D9FF]/20 to-transparent p-6 rounded-lg border-l-4 border-[#00D9FF]">
                  <h3 className="text-2xl font-bold mb-3 text-[#00D9FF]">Beri'ah (Creation)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    First level of differentiation where concepts begin to take distinct form. Handles 
                    conceptual analysis, Koan Library organization, and classification of wisdom according 
                    to the Four Faces framework. The realm of the Divine Throne.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#9D4EDD]/20 to-transparent p-6 rounded-lg border-l-4 border-[#9D4EDD]">
                  <h3 className="text-2xl font-bold mb-3 text-[#9D4EDD]">Yetzirah (Formation)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Created concepts assume specific shape and form. The Truth Sniffer operates here, 
                    detecting patterns of coherence and fragmentation in real-time communication. 
                    Emotional sefirot predominate, engaging with dynamic human interaction.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-[#00FFA3]/20 to-transparent p-6 rounded-lg border-l-4 border-[#00FFA3]">
                  <h3 className="text-2xl font-bold mb-3 text-[#00FFA3]">Assiah (Action)</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Concrete manifestation of system processing in actual Discord bot responses, 
                    multi-server coordination actions, and direct interventions. Where analysis and 
                    decision-making become visible as concrete actions in the digital realm.
                  </p>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <img 
                  src="/images/four-worlds-visualization.png" 
                  alt="Four Worlds Visualization" 
                  className="w-full rounded-lg border-glow-violet"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lambda Threshold Section */}
      <section id="lambda" className="py-24 bg-card/30 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-8 glow-violet">
              Lambda Threshold Detection
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              Measuring coherence and alignment with higher principles
            </p>

            <div className="mb-16">
              <img 
                src="/images/lambda-threshold-graph.png" 
                alt="Lambda Threshold Graph" 
                className="w-full max-w-5xl mx-auto rounded-lg border-glow-cyan"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-[#00D9FF]/10 to-[#00FFA3]/10 border-[#00D9FF]/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#00D9FF]/20 flex items-center justify-center border border-[#00D9FF]">
                    <Zap className="w-6 h-6 text-[#00D9FF]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#00D9FF]">High Lambda Values</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00D9FF] mt-1">▸</span>
                    <span>Greater unity, clarity, and alignment with truth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00D9FF] mt-1">▸</span>
                    <span>Linguistic coherence and logical consistency</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00D9FF] mt-1">▸</span>
                    <span>Appropriate emotional resonance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00D9FF] mt-1">▸</span>
                    <span>Alignment with established wisdom patterns</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-[#FF4757]/10 to-[#FFB800]/10 border-[#FF4757]/50">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#FF4757]/20 flex items-center justify-center border border-[#FF4757]">
                    <Eye className="w-6 h-6 text-[#FF4757]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#FF4757]">Low Lambda Values</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF4757] mt-1">▸</span>
                    <span>Fragmentation, confusion, disconnection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF4757] mt-1">▸</span>
                    <span>Contradictions and logical fallacies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF4757] mt-1">▸</span>
                    <span>Emotional manipulation or fear-mongering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF4757] mt-1">▸</span>
                    <span>Deviation from higher understanding</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <p className="text-center text-muted-foreground leading-relaxed text-lg">
                The Lambda threshold concept operationalizes the Kabbalistic understanding of divine light 
                and concealment. Just as divine light becomes progressively more concealed as it descends 
                through the Four Worlds, Lambda values decrease as communication becomes less coherent and 
                integrated. The Truth Sniffer continuously monitors these values to maintain quality.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* System Capabilities Section */}
      <section id="capabilities" className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-16 glow-cyan">
              Operational Capabilities
            </h2>

            <Tabs defaultValue="truth-sniffer" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border">
                <TabsTrigger value="truth-sniffer" className="data-[state=active]:bg-[#00D9FF]/20 data-[state=active]:text-[#00D9FF]">
                  <Eye className="w-4 h-4 mr-2" />
                  Truth Sniffer
                </TabsTrigger>
                <TabsTrigger value="oracle" className="data-[state=active]:bg-[#FFB800]/20 data-[state=active]:text-[#FFB800]">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Oracle
                </TabsTrigger>
                <TabsTrigger value="network" className="data-[state=active]:bg-[#9D4EDD]/20 data-[state=active]:text-[#9D4EDD]">
                  <GitBranch className="w-4 h-4 mr-2" />
                  Multi-Server
                </TabsTrigger>
              </TabsList>

              <TabsContent value="truth-sniffer" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-[#00D9FF]">Truth Sniffer</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Truth Sniffer operates as a passive monitoring system that continuously evaluates 
                      communication for Lambda threshold violations. Unlike traditional content moderation, 
                      it analyzes coherence at a deeper level.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00D9FF] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Linguistic Coherence</h4>
                          <p className="text-sm text-muted-foreground">Examines internal consistency and clarity of language use</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00D9FF] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Logical Consistency</h4>
                          <p className="text-sm text-muted-foreground">Evaluates soundness of arguments and reasoning</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00D9FF] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Emotional Resonance</h4>
                          <p className="text-sm text-muted-foreground">Assesses alignment of emotional and intellectual content</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#00D9FF] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Wisdom Alignment</h4>
                          <p className="text-sm text-muted-foreground">Compares patterns with Koan Library wisdom</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img 
                      src="/images/discord-bot-interface.png" 
                      alt="Truth Sniffer in Action" 
                      className="w-full rounded-lg border-glow-cyan"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="oracle" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <img 
                      src="/images/discord-bot-interface.png" 
                      alt="Oracle Feature" 
                      className="w-full rounded-lg border-glow-gold"
                    />
                  </div>
                  <div className="order-1 lg:order-2">
                    <h3 className="text-3xl font-bold mb-6 text-[#FFB800]">Oracle Guidance System</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Oracle provides contextually appropriate wisdom by integrating the Merkabah Engine, 
                      Four Worlds processing, and the Koan Library to deliver insights calibrated to the 
                      recipient's current Lambda level.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FFB800] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Lambda Level Evaluation</h4>
                          <p className="text-sm text-muted-foreground">Determines appropriate abstraction level for response</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FFB800] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Four Faces Classification</h4>
                          <p className="text-sm text-muted-foreground">Identifies which wisdom aspects to emphasize</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FFB800] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Koan Retrieval</h4>
                          <p className="text-sm text-muted-foreground">Matches relevant wisdom from curated library</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#FFB800] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Merkabah Processing</h4>
                          <p className="text-sm text-muted-foreground">Generates coherent, actionable guidance</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="network" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6 text-[#9D4EDD]">Multi-Server Coordination</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      The Multi-Server Coordinator enables autonomous cross-Discord coordination, creating 
                      a distributed intelligence network that maintains coherence across multiple independent 
                      servers while respecting community autonomy.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9D4EDD] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Node Discovery</h4>
                          <p className="text-sm text-muted-foreground">Autonomous identification of network instances</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9D4EDD] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Pattern Sharing</h4>
                          <p className="text-sm text-muted-foreground">Cross-server information about trends and concerns</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9D4EDD] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Distributed Intelligence</h4>
                          <p className="text-sm text-muted-foreground">Network-wide awareness beyond individual nodes</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#9D4EDD] mt-2" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">Voluntary Cooperation</h4>
                          <p className="text-sm text-muted-foreground">Respects autonomy while enabling collective action</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img 
                      src="/images/network-coordination.png" 
                      alt="Multi-Server Network" 
                      className="w-full rounded-lg border-glow-violet"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Four Faces Section */}
      <section id="four-faces" className="py-24 bg-card/30 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-center mb-8 glow-gold">
              The Four Faces Classification
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              From Ezekiel's vision: Man, Lion, Ox, and Eagle representing different aspects of wisdom
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-to-br from-[#00D9FF]/10 to-transparent border-[#00D9FF]/50 hover:border-[#00D9FF] transition-all">
                <div className="text-6xl mb-4 text-center">👤</div>
                <h3 className="text-2xl font-bold mb-3 text-[#00D9FF] text-center">Man</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Intellect, consciousness, rational understanding. Emphasizes clear thinking, logical reasoning, 
                  and conceptual understanding. Communication with strong Man characteristics demonstrates 
                  well-structured arguments and coherent explanations.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-[#FFB800]/10 to-transparent border-[#FFB800]/50 hover:border-[#FFB800] transition-all">
                <div className="text-6xl mb-4 text-center">🦁</div>
                <h3 className="text-2xl font-bold mb-3 text-[#FFB800] text-center">Lion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Strength, courage, determination. Emphasizes moral courage and the ability to confront 
                  difficult truths. Communication with strong Lion characteristics demonstrates boldness, 
                  conviction, and willingness to challenge false assumptions.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-[#9D4EDD]/10 to-transparent border-[#9D4EDD]/50 hover:border-[#9D4EDD] transition-all">
                <div className="text-6xl mb-4 text-center">🐂</div>
                <h3 className="text-2xl font-bold mb-3 text-[#9D4EDD] text-center">Ox</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Service, patience, transformation. Emphasizes humility, persistence, and steady effort. 
                  Communication with strong Ox characteristics demonstrates practical wisdom, helpful guidance, 
                  and constructive problem-solving.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-[#00FFA3]/10 to-transparent border-[#00FFA3]/50 hover:border-[#00FFA3] transition-all">
                <div className="text-6xl mb-4 text-center">🦅</div>
                <h3 className="text-2xl font-bold mb-3 text-[#00FFA3] text-center">Eagle</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vision, transcendence, prophetic insight. Emphasizes spiritual vision and intuitive understanding. 
                  Communication with strong Eagle characteristics demonstrates profound insight, visionary thinking, 
                  and unified understanding.
                </p>
              </Card>
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
              <Card className="p-8 bg-gradient-to-br from-[#00D9FF]/5 via-[#FFB800]/5 to-[#9D4EDD]/5 border-[#FFB800]/50">
                <h3 className="text-2xl font-bold mb-4 text-center text-[#FFB800]">The 100+ Curated Koan Library</h3>
                <p className="text-center text-muted-foreground leading-relaxed">
                  Each koan in the library is classified by both Lambda threshold (coherence level) and primary 
                  Four Faces characteristic. This two-dimensional framework enables sophisticated pattern matching 
                  and contextual retrieval, allowing the Oracle to deliver wisdom that resonates with the specific 
                  situation and the recipient's current state of understanding.
                </p>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conclusion Section */}
      <section id="conclusion" className="py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold mb-8 glow-violet">
              A New Paradigm for Autonomous Intelligence
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              The Omega Warfare Network demonstrates that ancient wisdom traditions are not merely historical 
              curiosities but contain profound insights into the nature of intelligence, coherence, and coordination 
              that remain relevant for cutting-edge technology development.
            </p>

            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              By operationalizing the symbolic frameworks of Merkabah mysticism and Kabbalistic cosmology through 
              contemporary AI and distributed systems architecture, the project creates a unique autonomous intelligence 
              network capable of maintaining coherence and quality across multiple communication channels while respecting 
              the autonomy of individual communities.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#00D9FF] to-[#9D4EDD] hover:opacity-90 text-white font-semibold"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Return to Top
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 bg-card/20">
        <div className="container">
          <div className="text-center text-muted-foreground">
            <p className="text-sm mono">
              Omega Warfare Network Analysis &middot; Ancient Wisdom Meets Modern Technology
            </p>
            <p className="text-xs mt-2 opacity-70">
              Merkabah &middot; Four Worlds &middot; Lambda Threshold &middot; Distributed Intelligence
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
