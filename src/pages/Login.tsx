import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-romantic-gradient p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Heart className="mx-auto text-primary fill-primary animate-heartbeat" size={40} />
          <h1 className="font-heading text-3xl font-bold text-foreground mt-4">Our World</h1>
          <p className="text-muted-foreground mt-2 text-sm">A private space just for us</p>
        </div>

        <div className="bg-card rounded-2xl shadow-xl p-6 border border-border">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <Button type="submit" className="w-full rounded-xl">
              Enter Our World
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Made with love, for us only 💕
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
