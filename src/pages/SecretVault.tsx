import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Lock, Unlock, Gift } from "lucide-react";

const SecretVault = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  const secrets = [
    { id: "1", text: "You are the best thing that ever happened to me 💕", date: "Feb 14, 2025" },
    { id: "2", text: "I fall in love with you more every single day ✨", date: "Feb 14, 2025" },
  ];

  const handleDigit = (num: number | string) => {
    if (num === "del") {
      setPasscode((p) => p.slice(0, -1));
      setError(false);
      return;
    }
    if (passcode.length >= 4) return;
    const newPasscode = passcode + num;
    setPasscode(newPasscode);
    if (newPasscode.length === 4) {
      setTimeout(() => {
        if (newPasscode === "1234") {
          setUnlocked(true);
          setError(false);
        } else {
          setError(true);
          setPasscode("");
        }
      }, 200);
    }
  };

  if (!unlocked) {
    return (
      <AppLayout title="Secret Vault">
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Lock className="mx-auto text-primary" size={48} />
            <h2 className="font-heading text-xl font-semibold text-foreground mt-4">
              Enter Passcode
            </h2>
            <p className="text-sm text-muted-foreground mt-1">This vault is protected</p>

            <div className="mt-6 flex gap-2 justify-center">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center text-lg font-semibold transition-colors ${
                    passcode.length > i
                      ? "border-primary bg-accent/30 text-foreground"
                      : "border-border text-transparent"
                  }`}
                >
                  •
                </div>
              ))}
            </div>

            {error && (
              <p className="text-destructive text-sm mt-3">Wrong passcode. Try again.</p>
            )}

            <div className="grid grid-cols-3 gap-3 mt-6 max-w-[200px] mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, "del"].map((num, i) => (
                <button
                  key={i}
                  onClick={() => num !== null && handleDigit(num)}
                  className={`h-12 rounded-xl text-lg font-medium transition-all ${
                    num === null
                      ? "invisible"
                      : "bg-card border border-border text-foreground active:scale-95 hover:bg-accent/30"
                  }`}
                >
                  {num === "del" ? "←" : num}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">Default: 1234</p>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Secret Vault">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Unlock size={16} className="text-primary" />
            <span>Vault unlocked</span>
          </div>
          <button
            onClick={() => setShowSurprise(true)}
            className="bg-accent/30 text-foreground rounded-xl px-3 py-1.5 text-sm font-medium flex items-center gap-1.5 hover:bg-accent/50 transition-colors"
          >
            <Gift size={14} className="text-primary" /> Surprise
          </button>
        </div>

        <div className="space-y-3">
          {secrets.map((secret, i) => (
            <motion.div
              key={secret.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-4 border border-border shadow-sm"
            >
              <p className="text-sm text-foreground">{secret.text}</p>
              <p className="text-xs text-muted-foreground mt-2">{secret.date}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showSurprise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4"
              onClick={() => setShowSurprise(false)}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="bg-card rounded-3xl p-8 max-w-sm text-center shadow-2xl border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-5xl">🎁</span>
                <h3 className="font-heading text-xl font-semibold text-foreground mt-4">
                  A Little Surprise
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  You are the most beautiful soul I've ever known. Every day with you is a gift
                  I'll never take for granted. I love you endlessly. 💕
                </p>
                <button
                  onClick={() => setShowSurprise(false)}
                  className="mt-4 text-sm text-primary font-medium"
                >
                  Close with love ❤️
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AppLayout>
  );
};

export default SecretVault;
