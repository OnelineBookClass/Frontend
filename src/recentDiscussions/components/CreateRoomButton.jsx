import React from 'react';
import ButtonStyled from '@mui/material/Button';

function CreateRoomButton() {
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
        >
            방 만들기
        </ButtonStyled>
    );
}

export default CreateRoomButton;
