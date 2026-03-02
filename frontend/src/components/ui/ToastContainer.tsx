import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/context/ToastContext";
import AvisoToast from "../shared/AvisoToast";

export default function ToastContainer() {
  const { toast, removeToast } = useToast();

  return (
    <div className="fixed bottom-3 right-3 space-y-2">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <AvisoToast
              title={toast.title}
              category={toast.category}
              description={toast.description}
              onClose={() => removeToast(toast.id)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
