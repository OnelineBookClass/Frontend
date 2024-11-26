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
                        backgroundColor: isDark ? "#0d142d" : "#ffffff",
                        color: isDark ? "#ffffff" : "#0d142d",
                        maxWidth: "1000px",
                        margin: "0 auto",
                        marginBottom: "10rem",
                    },
                }}
            />
            <AppContent />
        </BrowserRouter>
    );
}

export default Router;
