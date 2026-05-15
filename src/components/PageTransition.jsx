import { motion } from "framer-motion";

function PageTransition({ children }) {
    return(
        <motion.div
            //initial={{ opacity: 0, y: 40 }}
            //animate={{ opacity: 1, y: 0 }}
            //exit={{ opacity: 0, y: -40 }}
            ///transition={{ duration: 0.5 }}
            style={{ overflow: "hidden" }}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition;