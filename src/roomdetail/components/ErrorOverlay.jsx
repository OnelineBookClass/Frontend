import React from "react";
import {
    Overlay,
    OverlayContent,
    OverlayButton,
} from "../styles/RoomDetailPage.style";

const ErrorOverlay = ({ onConfirm }) => {
    return (
        <Overlay>
            <OverlayContent>
                <h2>퀴즈를 틀리면 방에 참가할 수 없습니다!</h2>
                <OverlayButton onClick={onConfirm}>확인</OverlayButton>
            </OverlayContent>
        </Overlay>
    );
};

export default ErrorOverlay;
