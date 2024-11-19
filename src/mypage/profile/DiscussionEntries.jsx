import React, { useState, useEffect } from "react";
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-bottom: 10rem;
`;

function DiscussionEntries({ discussions }) {
    return (
        <Wrapper>
            <Grid container spacing={2}>
                {discussions.map((discussion) => (
                    <Grid item xs={3} key={discussion.discussionId}>
                        <Card>
                            <CardMedia
                                component='img'
                                image={discussion.thumbnail}
                                alt={"사진이 존재하지 않습니다."}
                                sx={{ height: 120 }}
                            />

                            <CardContent>
                                <Typography
                                    variant='body2'
                                    color='textPrimary'
                                    gutterBottom
                                    sx={{ fontSize: "0.75rem" }}
                                >
                                    방 제목 : {discussion.roomTitle}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textPrimary'
                                    gutterBottom
                                    sx={{ fontSize: "0.75rem" }}
                                >
                                    책 제목 : {discussion.bookTitle}
                                </Typography>
                                <Typography
                                    variant='body2'
                                    color='textSecondary'
                                    sx={{ fontSize: "0.75rem" }}
                                >
                                    토론 일시 : {discussion.discussionDate}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
}

export default DiscussionEntries;
