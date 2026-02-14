import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Heart } from "lucide-react";

const sections = [
  {
    title: "How We Met",
    text: "Every great love story has a beginning. Ours started when our paths crossed in the most unexpected way...",
    emoji: "✨",
  },
  {
    title: "The Moment I Knew",
    text: "There was this one moment when everything changed. I looked at you and just knew you were the one...",
    emoji: "💫",
  },
  {
    title: "Our Growth",
    text: "Together, we've grown in ways I never imagined. Through every challenge and every joy, we became stronger...",
    emoji: "🌱",
  },
  {
    title: "Favorite Memories",
    text: "From late night conversations to spontaneous adventures, every moment with you is my favorite memory...",
    emoji: "🌸",
  },
];

const OurStory = () => {
  return (
    <AppLayout title="Our Story">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative pl-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-accent/30 border-2 border-primary flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>

              <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
                <span className="text-2xl">{section.emoji}</span>
                <h3 className="font-heading text-lg font-semibold text-foreground mt-2">
                  {section.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {section.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <Heart className="mx-auto text-primary fill-primary" size={20} />
          <p className="font-heading text-sm text-muted-foreground mt-2 italic">
            To be continued...
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default OurStory;
