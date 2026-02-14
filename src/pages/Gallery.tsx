import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { ImagePlus } from "lucide-react";

const Gallery = () => {
  return (
    <AppLayout title="Gallery">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="bg-card rounded-2xl p-8 border border-border border-dashed">
          <ImagePlus className="mx-auto text-muted-foreground" size={40} />
          <p className="font-heading text-lg text-foreground mt-4">Your Memories</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload photos to fill your gallery
          </p>
          <button className="mt-4 bg-primary text-primary-foreground rounded-xl px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity">
            Add Photos
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Photo storage will be connected soon
        </p>
      </motion.div>
    </AppLayout>
  );
};

export default Gallery;
