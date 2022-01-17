import { useEffect, useState } from "react";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";

import { Card } from "react-bootstrap";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";
import styled from "styled-components";
import song from "./Song.mp3";
import { height } from "@mui/system";
import imageAlt from './noImg.png'

const Container = styled.div`
    flex: 1;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Play = styled(PlayArrowIcon)`
    /* transform: translate(1s ease); */
    transition: 0.9s ease;
`;
const Pause = styled(PauseIcon)`
    /* transform: translate(1s ease); */
    transition: 0.9s ease;
`;
export default function MediaControlCard({ selectedSong }) {
    const db = new Dexie("selectedSongs");
    db.version(1).stores({
        items: "++id,increDecre",
    });
    const allItems = useLiveQuery(() => db.items.toArray(), []);
    // const theme = useTheme();
    // const Cards = styled(Card)`
    //     height: 80vh;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    // `;
    const [img, setImg] = useState();

    // console.log(allItems);
    var URL = window.URL || window.webkitURL;

    // Create and revoke ObjectURL
    const [playAudio, setplayAudio] = useState({
        audio: "",
        isPlaying: false,
    });
    const increDecre = async (inc) => {
        if (inc) {
            console.log(inc);
            if (allItems.length === 0) {
                await db.items.add({ increDecre: "+" });
            } else {
                await db.items.update(1, { increDecre: "+" });
            }
        } else if (!inc) {
            console.log(inc);
            if (allItems.length === 0) {
                await db.items.add({ increDecre: "-" });
            } else {
                await db.items.update(1, { increDecre: "-" });
            }
        }
        else{
            await db.items.add({ increDecre: " " });
        }
        // console.log(allItems);
    };

    const MusicPlayer = async () => {
        console.log(selectedSong);
        if (selectedSong) {
            const { audio, isPlaying } = playAudio;

            if (isPlaying) {
                setplayAudio((prevState) => ({
                    ...prevState,
                    isPlaying: false,
                }));
                await audio.pause();
                // console.log(playAudio);
            } else {
                setplayAudio((prevState) => ({
                    ...prevState,
                    isPlaying: true,
                }));
                await audio.play();

                // console.log(playAudio);
            }
        }
    };

    useEffect(() => {
        const changeMusic = async () => {
            if (selectedSong) {
                console.log(selectedSong);
                var song = URL.createObjectURL(selectedSong.song);
                var Image = selectedSong.inputImage?URL.createObjectURL(selectedSong.inputImage):imageAlt;
                setImg(Image);
                const nowSong = new Audio(song);
                const { audio, isPlaying } = playAudio;
                if (audio) {
                    audio.pause();
                }
                setplayAudio((prevState) => ({
                    ...prevState,
                    audio: nowSong,
                    isPlaying: false,
                }));
                setplayAudio((prevState) => ({
                    ...prevState,
                    isPlaying: true,
                }));

                await nowSong.play();
            }
        };
        changeMusic();
    }, [selectedSong]);
    return (
        <Container>
            {!selectedSong ? (
                <div>Select a song</div>
            ) : (
                <Card
                    style={{
                        width: "18rem",
                        height: "80vh",
                        alignItems: "center",
                    }}>
                    <Card.Img
                        variant='top'
                        src={img}
                        style={{ width: "100%", height: "280px" }}
                    />
                    <Card.Body>
                        <Card.Title>{selectedSong.songName}</Card.Title>
                        
                        {selectedSong.singerName!==""?<Card.Text>By {selectedSong.singerName}</Card.Text>:''}
                        <SkipPreviousIcon onClick={()=>increDecre(false)}/>
                        {playAudio.isPlaying ? (
                            <Pause onClick={MusicPlayer} />
                        ) : (
                            <Play onClick={MusicPlayer} />
                        )}
                        <SkipNextIcon onClick={() => increDecre(true)} />
                    </Card.Body>
                </Card>
            )}
        </Container>
        
    );
}
