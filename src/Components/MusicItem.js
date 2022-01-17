import React from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";

const List = styled(ListGroup)`
    margin: 5px 10px;
    display: flex !important ;
    flex-direction: row;
    justify-content: space-evenly;

`;
const DetailsContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* flex: 4; */
`;
const TextContainer = styled.div`
    margin: 0 30px;
`;
// const Image = styled.img`
//     width: 40px;
//     height: 40px;
// `;
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
const IconContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* flex:1; */
`;
const MusicItem = ({ data, nowDeleted, getSong }) => {
   
    return (
        <List.Item style={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
            <DetailsContainer>
                {/* <Image src="" />  */}
                <TextContainer>
                    <SongNameContainer>{data.songName}</SongNameContainer>
                    {data.singerName?<SingerNameContainer>{data.singerName}</SingerNameContainer>:''}
                    {/* {data.genre?<GenreContainer>{data.genre}</GenreContainer>:''} */}
                </TextContainer>
            </DetailsContainer>
            <IconContainer>
                <PlayArrowIcon  onClick={() => getSong(data.id)}  />
                <DeleteIcon onClick={() => nowDeleted(data.id)} />
            </IconContainer>
        </List.Item>
    );
};

export default MusicItem;
