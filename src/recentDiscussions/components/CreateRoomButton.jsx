import React from 'react';
import ButtonStyled from '@mui/material/Button';
import {useNavigate } from 'react-router-dom';

function CreateRoomButton() {

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/createRoom'); // 지정된 경로로 이동
    };


    return (
        <ButtonStyled
            variant="contained"
            sx={{
                padding: '1rem',
                fontSize: '1.3rem',
                whiteSpace: 'nowrap',
                backgroundColor: 'black',
                borderRadius: '1rem',
                marginBottom : '1rem'
            }}
            onClick={handleButtonClick}
        >
            방 만들기
        </ButtonStyled>
    );
}

export default CreateRoomButton;
