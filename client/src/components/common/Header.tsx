export default function TodoHeader() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

                    {/* Logo and Title */}
                    <div className="flex items-center gap-3">
                        <div className="bg-white/15 border border-white/10 p-2 rounded-lg backdrop-blur-sm shadow-md">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Todo List
                            </h1>
                            <p className="text-sm text-slate-200 mt-0.5">
                                Stay organized and productive
                            </p>
                        </div>
                    </div>

                    {/* Date Display */}
                    <div className="text-right">
                        <div className="flex items-center gap-2 text-sm text-blue-100">
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span>{formattedDate}</span>
                        </div>

                        <div className="text-xs text-slate-300 mt-1">
                            {(() => {
                                const hour = date.getHours();
                                if (hour < 12) return "Good morning ☀️";
                                if (hour < 18) return "Good afternoon 🌤️";
                                return "Good evening 🌙";
                            })()}
                        </div>
                    </div>

                </div>
            </div>
        </header>
    );
}