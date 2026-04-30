import type {FooterProps} from "../../types/todo.ts";

export default function ToDoFooter({ totalTasks = 0, completedTasks = 0 }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const quotes = [
        "Stay organized, stay productive! 🚀",
        "Every task completed is a step forward ✨",
        "Productivity is never an accident 📝",
        "Small progress is still progress 🌟",
        "Your future self will thank you 🙏",
        "Make every day count ⚡",
        "Consistency over intensity 💪",
        "Done is better than perfect ✅"
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    return (
        <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-900 border-t border-white/10 mt-auto text-white shadow-inner">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                    {/* Copyright */}
                    <div className="text-sm text-slate-300">
                        <p>© {currentYear} Todo App. All rights reserved.</p>
                    </div>

                    {/* Stats */}
                    {totalTasks > 0 && (
                        <div className="flex flex-wrap justify-center items-center gap-4 text-sm">

                            <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                                <span className="text-slate-300">Total:</span>
                                <span className="font-semibold text-white">{totalTasks}</span>
                            </div>

                            <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                <span className="text-green-200">Completed:</span>
                                <span className="font-semibold text-green-300">{completedTasks}</span>
                            </div>

                            <div className="flex items-center gap-2 bg-blue-500/20 px-3 py-1 rounded-full backdrop-blur-sm">
                                <span className="text-blue-200">Progress:</span>
                                <span className="font-semibold text-blue-300">
                            {completionRate}%
                        </span>
                            </div>

                        </div>
                    )}

                    {/* Motivational Quote */}
                    <div className="text-sm text-slate-300 italic text-center md:text-right max-w-md">
                        <p>“{randomQuote}”</p>
                    </div>

                </div>
            </div>
        </footer>
    );
}