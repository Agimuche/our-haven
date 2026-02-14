import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Plus, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromiseItem {
  id: string;
  text: string;
  date: string;
}

const Promises = () => {
  const [activeTab, setActiveTab] = useState<"mine" | "yours">("mine");
  const [myPromises, setMyPromises] = useState<PromiseItem[]>(() => {
    const saved = localStorage.getItem("my-promises");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "1", text: "To always make you laugh, even on your worst days", date: "Feb 14, 2025" },
          { id: "2", text: "To never go to bed angry", date: "Feb 14, 2025" },
        ];
  });
  const [yourPromises, setYourPromises] = useState<PromiseItem[]>(() => {
    const saved = localStorage.getItem("your-promises");
    return saved ? JSON.parse(saved) : [];
  });
  const [newPromise, setNewPromise] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("my-promises", JSON.stringify(myPromises));
  }, [myPromises]);
  useEffect(() => {
    localStorage.setItem("your-promises", JSON.stringify(yourPromises));
  }, [yourPromises]);

  const addPromise = () => {
    if (!newPromise.trim()) return;
    const promise: PromiseItem = {
      id: Date.now().toString(),
      text: newPromise,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    if (activeTab === "mine") setMyPromises((prev) => [promise, ...prev]);
    else setYourPromises((prev) => [promise, ...prev]);
    setNewPromise("");
    setShowForm(false);
  };

  const promises = activeTab === "mine" ? myPromises : yourPromises;

  return (
    <AppLayout title="Our Promises">
      <div className="flex gap-2 mb-4">
        {(["mine", "yours"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {tab === "mine" ? "My Promises" : "Your Promises"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="space-y-3"
        >
          {promises.length === 0 && (
            <div className="text-center py-12">
              <Heart className="mx-auto text-muted-foreground" size={32} />
              <p className="text-sm text-muted-foreground mt-3">No promises yet</p>
              <p className="text-xs text-muted-foreground mt-1">Add your first promise below</p>
            </div>
          )}
          {promises.map((promise, i) => (
            <motion.div
              key={promise.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-2xl p-4 border border-border shadow-sm"
            >
              <div className="flex items-start gap-3">
                <Heart className="text-primary fill-primary mt-0.5 shrink-0" size={16} />
                <div>
                  <p className="text-sm text-foreground leading-relaxed">{promise.text}</p>
                  <p className="text-xs text-muted-foreground mt-2">{promise.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-card rounded-2xl p-4 border border-border"
        >
          <textarea
            value={newPromise}
            onChange={(e) => setNewPromise(e.target.value)}
            placeholder="Write your promise..."
            className="w-full bg-transparent text-sm outline-none resize-none text-foreground placeholder:text-muted-foreground"
            rows={3}
          />
          <div className="flex gap-2 mt-2">
            <Button onClick={addPromise} size="sm" className="rounded-xl">
              Save
            </Button>
            <Button onClick={() => setShowForm(false)} variant="ghost" size="sm" className="rounded-xl">
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {!showForm && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg"
        >
          <Plus size={24} />
        </motion.button>
      )}
    </AppLayout>
  );
};

export default Promises;
