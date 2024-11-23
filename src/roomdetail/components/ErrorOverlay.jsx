import React from "react";
import {
    Overlay,
    OverlayContent,
    OverlayButton,
} from "../styles/RoomDetailPage.style";

const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <Overlay>
            <OverlayContent>
                <h2>{message}</h2>
                <OverlayButton onClick={onConfirm}>확인</OverlayButton>
            </OverlayContent>
        </Overlay>
    );
};

export default ErrorOverlay;
