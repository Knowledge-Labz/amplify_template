import { motion } from "framer-motion";

export default function WiggleWrapper({...props}) {
    return (
        <motion.div
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.9 }}
            >
            {props.children}    
          </motion.div>
    )
}