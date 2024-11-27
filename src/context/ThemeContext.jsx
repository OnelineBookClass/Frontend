import React, { createContext, useContext, useState } from "react";

// Context 생성
const ThemeContext = createContext();

// Provider 컴포넌트
export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom Hook
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
