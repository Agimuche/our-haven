import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  { emoji: "💬", title: "Chat", path: "/chat", desc: "Our conversations" },
  { emoji: "📖", title: "Our Story", path: "/story", desc: "Our love story" },
  { emoji: "💍", title: "Promises", path: "/promises", desc: "Words of love" },
  { emoji: "🔐", title: "Secret Vault", path: "/vault", desc: "Our secrets" },
  { emoji: "📸", title: "Gallery", path: "/gallery", desc: "Our memories" },
  { emoji: "📹", title: "Video Call", path: "/video", desc: "Face to face" },
];

const loveReasons = [
  "Because your smile lights up my world",
  "Because you make every day better",
  "Because you understand me like no one else",
  "Because your laugh is my favorite sound",
  "Because home is wherever you are",
  "Because you believe in me when I don't",
  "Because every moment with you is magic",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [reasonIndex, setReasonIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setReasonIndex((i) => (i + 1) % loveReasons.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Anniversary countdown
  const anniversary = new Date("2025-02-14");
  const now = new Date();
  const nextAnniversary = new Date(anniversary);
  nextAnniversary.setFullYear(now.getFullYear());
  if (nextAnniversary < now) nextAnniversary.setFullYear(now.getFullYear() + 1);
  const daysUntil = Math.ceil(
    (nextAnniversary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-romantic-gradient">
      <header className="px-4 pt-6 pb-2 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Our World</h1>
          <p className="text-sm text-muted-foreground">Welcome back, love 💕</p>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={20} />
        </button>
      </header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 py-4"
      >
        {/* Anniversary Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl p-5 mb-4 text-center border border-border shadow-sm"
        >
          <Heart className="mx-auto text-primary fill-primary animate-heartbeat" size={24} />
          <p className="text-sm text-muted-foreground mt-2">Days until our anniversary</p>
          <p className="font-heading text-4xl font-bold text-foreground mt-1">{daysUntil}</p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {features.map((feature, i) => (
            <motion.button
              key={feature.path}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              onClick={() => navigate(feature.path)}
              className="bg-card rounded-2xl p-5 text-left border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 active:scale-95"
            >
              <span className="text-3xl">{feature.emoji}</span>
              <h3 className="font-heading font-semibold text-foreground mt-2">
                {feature.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{feature.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* Love Reason */}
        <motion.div
          key={reasonIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center px-4 py-3"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Why I love you
          </p>
          <p className="font-heading text-sm text-foreground italic">
            &ldquo;{loveReasons[reasonIndex]}&rdquo;
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
