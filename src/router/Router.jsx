import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent";

function Router() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <AppContent />
        </BrowserRouter>
    );
}

export default Router;
