import { motion } from "framer-motion";
import AppLayout from "@/components/AppLayout";
import { Video } from "lucide-react";

const VideoCall = () => {
  return (
    <AppLayout title="Video Call">
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Video className="mx-auto text-primary" size={48} />
          <h2 className="font-heading text-xl font-semibold text-foreground mt-4">
            Video Call
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
            Private video calling will be available soon. We're setting up a secure connection just for us.
          </p>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default VideoCall;
