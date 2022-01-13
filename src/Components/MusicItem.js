import React from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

const List = styled(ListGroup)`
    margin: 5px 10px;
    display: flex;
    flex-direction: row;
`;
const TextContainer = styled.div``;
const SongNameContainer = styled.h3`
    margin: 0;
    font-weight: 400;
    font-size: 1rem;
    `;
const SingerNameContainer = styled.h6`
    margin: 0;
    font-weight: 300;
    font-size: 0.7rem;
`;
const GenreContainer = styled.span`
    margin: 0;
    font-weight: 400;
`;
const IconContainer = styled.div``;
const MusicItem = ({ data,nowDeleted,getSong }) => {
    
    return (
        <List.Item>
            <TextContainer>
                <SongNameContainer>{data.songName}</SongNameContainer>
                <SingerNameContainer>{data.singerName}</SingerNameContainer>
                <GenreContainer>{data.genre}</GenreContainer>
            </TextContainer>
            <IconContainer>
                <PlayArrowIcon onClick={()=>getSong(data.id)} />
                <DeleteIcon onClick={()=>nowDeleted(data.id)} />
            </IconContainer>
        </List.Item>
    );
};

export default MusicItem;
