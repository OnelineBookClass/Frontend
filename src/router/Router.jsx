import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";
import { GlobalStyles } from "@mui/material";
import { useTheme } from "../context/ThemeContext";

function Router() {
    const { isDark } = useTheme();

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <GlobalStyles
                styles={{
                    "*, *::before, *::after": {
                        transition:
                            "background-color 0.2s ease, color 0.05s ease",
                    },
                    body: {
                        backgroundColor: isDark ? "#1A293F" : "#ffffff",
                        color: isDark ? "#ffffff" : "#1A293F",
                        maxWidth: "1000px",
                        margin: "0 auto",
                        marginBottom: "10rem",
                    },
                    "*::-webkit-scrollbar": {
                        width: "12px",
                    },
                    "*::-webkit-scrollbar-track": {
                        background: "#f1f1f1",
                        borderRadius: "4px",
                        margin: "8px",
                    },
                    "*::-webkit-scrollbar-thumb": {
                        background: "#1a293f",
                        borderRadius: "4px",
                        border: "2px solid #f9f9f9",
                        "&:hover": {
                            background: "#2a3b4f",
                        },
                    },
                }}
            />
            <AppContent />
        </BrowserRouter>
    );
}

export default Router;
