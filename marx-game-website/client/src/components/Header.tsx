import { Link } from "wouter";
import { motion } from "framer-motion";
import { Factory } from "lucide-react";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-amber-500/10 bg-stone-950/60 backdrop-blur-xl transition-all duration-300"
    >
      <div className="container mx-auto flex h-full items-center justify-center px-6">
        <Link href="/" className="group flex items-center gap-4 transition-all duration-500">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.1 }}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-700/10 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] transition-all"
          >
            <Factory className="h-4.5 w-4.5 text-amber-500" />
          </motion.div>
          
          <div className="flex flex-col items-center">
            <span className="text-xl font-black tracking-[0.2em] text-white uppercase sm:text-2xl">
              <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_linear_infinite]">
                Tồn tại
              </span>
              <span className="mx-2 text-stone-600 font-serif italic text-lg">&</span>
              <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-200 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] delay-1000">
                Ý thức
              </span>
            </span>
            <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent transition-all duration-700" />
          </div>
        </Link>
      </div>
    </motion.header>
  );
}
