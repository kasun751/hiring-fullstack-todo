import type {LoaderProps} from "../../types/todo.ts";
import {LORDERCOLORCLASSES, LORDERSIZECLASSES} from "../../constant/todoConstants.ts";

export default function ModernLoader({
                                         variant = "spinner",
                                         size = "md",
                                         fullPage = true,
                                         text,
                                         color = "blue",
                                         overlay = true
                                     }: LoaderProps) {


    const getLoaderContent = () => {
        switch (variant) {
            case "gradient":
                return (
                    <div className="relative">
                        <div className={`${LORDERSIZECLASSES[size].container} rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-spin`}>
                            <div className="absolute inset-1 bg-white rounded-full"></div>
                        </div>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-ping opacity-30`}></div>
                    </div>
                );

            case "wave":
                return (
                    <div className="flex gap-1 items-end">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={i}
                                className={`${LORDERSIZECLASSES[size].dot} rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-wave`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                );

            case "ripple":
                return (
                    <div className="relative">
                        <div className={`${LORDERSIZECLASSES[size].ripple} rounded-full border-4 border-transparent border-t-${color}-500 animate-spin`}></div>
                        <div className={`absolute inset-0 rounded-full border-4 border-${color}-200 opacity-30`}></div>
                        <div className={`absolute inset-2 rounded-full border-4 border-dashed border-${color}-400 animate-spin-slow`}></div>
                    </div>
                );

            case "pulsing-circle":
                return (
                    <div className="relative">
                        <div className={`${LORDERSIZECLASSES[size].container} rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-pulse`}></div>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-ping opacity-60`}></div>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-ripple`}></div>
                    </div>
                );

            case "bouncing-dots":
                return (
                    <div className="flex gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className={`${LORDERSIZECLASSES[size].dot} rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-bounce`}
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                );

            case "pulse":
                return (
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <div className={`${LORDERSIZECLASSES[size].container} rounded-full bg-gray-200 animate-pulse`}>
                                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-pulse-scale`}></div>
                            </div>
                        </div>
                        <div className="w-full max-w-xs">
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} rounded-full animate-loading-bar`}></div>
                            </div>
                        </div>
                    </div>
                );

            default: // spinner
                return (
                    <div className="relative">
                        <svg
                            className={`${LORDERSIZECLASSES[size].container} animate-spin`}
                            viewBox="0 0 50 50"
                        >
                            <circle
                                className="opacity-20 text-gray-200"
                                cx="25"
                                cy="25"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <circle
                                className={`text-${color}-500`}
                                cx="25"
                                cy="25"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="80"
                                strokeDashoffset="60"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${LORDERCOLORCLASSES[color]} animate-pulse opacity-20 blur-md`}></div>
                    </div>
                );
        }
    };

    const loaderContent = (
        <div className={`flex flex-col items-center justify-center gap-4 ${overlay ? 'relative z-50' : ''}`}>
            {getLoaderContent()}
            {text && (
                <div className="text-center">
                    <p className={`${LORDERSIZECLASSES[size].text} font-medium text-gray-700 animate-pulse`}>
                        {text}
                    </p>
                    <div className="flex gap-1 mt-2 justify-center">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    if (fullPage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
                {loaderContent}
            </div>
        );
    }

    return loaderContent;
}