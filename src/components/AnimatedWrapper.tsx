import { FC } from 'react';
import { motion } from 'framer-motion';
import '../styles/transition.css'

interface AnimatedWrapperProps {
    children: string;
}

const AnimatedWrapper: FC<AnimatedWrapperProps> = ({ children }) => {
    return (
        <motion.div
            className="snake-text-container w-screen h-screen flex justify-center items-center"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.5 }}
        >
            {children.split('').map((char, index) => (
                <motion.span
                    key={index}
                    className="snake-char font-semibold"
                    initial={{ y: 0 }}
                    animate={{
                        y: [0, 10, 0],
                        transition: {
                            repeat: Infinity,
                            duration: 1,
                            delay: index * 0.1,
                        },
                    }}
                    data-char={char}
                >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default AnimatedWrapper;
