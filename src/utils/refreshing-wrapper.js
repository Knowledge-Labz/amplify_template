import { motion } from "framer-motion";

export default function RefreshingWrapper({...props}) {
    return (
        
        <motion.div
            animate={{
                scale: [1, 1.5, 1],
                rotate: [360, 360, 0],
                borderRadius: ["0%", "50%", "0%"]
            }}
            transition={{
                duration: 0.4,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
            }}
            >
            {props.children}    
          </motion.div>
    )
}