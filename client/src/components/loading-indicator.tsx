import { motion, AnimatePresence } from "framer-motion";

interface LoadingIndicatorProps {
  isVisible: boolean;
}

export default function LoadingIndicator({ isVisible }: LoadingIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          className="fixed top-4 right-4 bg-deep-purple text-white px-4 py-2 rounded-full shadow-lg z-50"
          data-testid="loading-indicator"
        >
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-4 h-4 bg-white rounded-full"
            />
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
