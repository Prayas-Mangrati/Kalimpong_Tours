import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.json";
import { motion } from "framer-motion";

export default function AiAssistant() {
  return (
    <motion.div
      className="fixed bottom-6 right-6 w-28 z-50 cursor-pointer"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.08,
      }}
    >
      <Lottie animationData={robotAnimation} loop={true} />
    </motion.div>
  );
}
