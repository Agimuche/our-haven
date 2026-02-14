import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface AppLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AppLayout = ({ title, children }: AppLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-heading text-lg font-semibold text-foreground">{title}</h1>
      </header>
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4 pb-8"
      >
        {children}
      </motion.main>
    </div>
  );
};

export default AppLayout;
