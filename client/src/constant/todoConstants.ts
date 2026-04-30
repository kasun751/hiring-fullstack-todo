/**
 * Default TODO object used for initializing state in forms and UI
 * Ensures consistent structure when creating or resetting a TODO item
 */
export const initialToDoObj = {
    _id:"",
    title:"",
    description:"",
    done:false,
    createdAt:"",
    updatedAt:""
}

/**
 *  Motivational quotes used in UI (e.g., empty states, loading screens)
 *  Helps improve user engagement and experience
 */
export const QUOTES = [
    "Stay organized, stay productive! 🚀",
    "Every task completed is a step forward ✨",
    "Productivity is never an accident 📝",
    "Small progress is still progress 🌟",
    "Your future self will thank you 🙏",
    "Make every day count ⚡",
    "Consistency over intensity 💪",
    "Done is better than perfect ✅"
];

/**
 * Size configuration for loading spinner component
 * Controls container size, dot size, ripple effect, and text scaling
 * Used to maintain consistent loader styling across different UI sections
 */
export const LORDERSIZECLASSES = {
    sm: {
        container: "w-12 h-12",
        dot: "w-2 h-2",
        ripple: "w-8 h-8",
        text: "text-sm"
    },
    md: {
        container: "w-16 h-16",
        dot: "w-3 h-3",
        ripple: "w-12 h-12",
        text: "text-base"
    },
    lg: {
        container: "w-24 h-24",
        dot: "w-4 h-4",
        ripple: "w-16 h-16",
        text: "text-lg"
    },
    xl: {
        container: "w-32 h-32",
        dot: "w-5 h-5",
        ripple: "w-20 h-20",
        text: "text-xl"
    }
};

/**
 * Color variants for loader component
 * Provides gradient-based color themes for consistent UI styling
 * Used to enhance visual feedback during loading states
 */
export const LORDERCOLORCLASSES = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600"
};