import React from 'react';
import ButtonStyled from '@mui/material/Button';
import axiosInstance from '../../utils/axiosConfig';

function CreateRoomButton() {
    const handleCreateRoom = async () => {
        const requestData = {
            userId: 123,
            bookTitle: "string",
            roomTitle: "string",
            introduction: "string",
            publisher: "string",
            quiz: [
                {
                    quiz1: "string",
                    quiz1Solution: 2,
                    multipleChoice1: "string",
                    multipleChoice2: "string",
                    multipleChoice3: "string",
                },
            ],
        };
        try {
            const response = await axiosInstance.post('/mongdangbul/rooms/newRoomSetting', requestData);
            console.log('방 생성 성공:', response.data);
        } catch (error) {
            console.error('방 생성 실패:', error);
        }

        // 일단 버튼 클릭 시 위 데이터를 보내도록만 구현 (수정 필요)
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
            onClick={handleCreateRoom}
        >
            방 만들기
        </ButtonStyled>
    );
}

export default CreateRoomButton;
