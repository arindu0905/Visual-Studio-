"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/utils";

/** Re-mounts on every navigation, giving each page a soft cinematic entrance. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: EASE }}>
      {children}
    </motion.div>
  );
}
