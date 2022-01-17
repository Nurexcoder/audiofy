import { useEffect, useState } from "react";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { ListGroup } from "react-bootstrap";
import MusicItem from "./MusicItem";
import styled from "styled-components";

const Lists = styled(ListGroup)`
    flex: 1;
    height: 90vh;
    overflow: scroll;
    /* margin: 10px 15px; */
`;
const MusicLists = ({ getSelectedSong }) => {
    const db = new Dexie("SongData");
    db.version(1).stores({
        items: "++id,songName,singerName,genreName,inputImage,song",
    });
    const increDecre = new Dexie("selectedSongs");
    increDecre.version(1).stores({
        items: "++id,increDecre",
    });
    // const [nowDeleted, setNowDeleted] = useState(null)
    const nowDeleted = async (index) => {
        await db.items.delete(index);
    };
    const allItems = useLiveQuery(() => db.items.toArray(), []);
    const prevNext = useLiveQuery(() => increDecre.items.toArray(), []);

    // const [prevOrNext, setPrevOrNext] = useState(prevNext);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const getSong = (songIndex) => {
        console.log(songIndex);
        const song = allItems.find((item) => item.id === songIndex);
        const index = allItems.findIndex((item) => item.id === song.id);
        // console.log(song);
        setSelectedIndex(index);
        getSelectedSong(song);
    };
    useEffect(async() => {
        // console.log(prevNext);
        if (prevNext) {
            if (prevNext[0].increDecre == '+') {
                console.log("Hi");

                const song = allItems[(selectedIndex+1)%allItems.length]
                setSelectedIndex(prevState=>++prevState)
                getSelectedSong(song);
                console.log(song);
                await increDecre.items.update(1, { increDecre: "" });
            }
            if (prevNext[0].increDecre == '-') {
                console.log("Hi");

                const song = allItems[(selectedIndex-1)%allItems.length]
                setSelectedIndex(prevState=>--prevState)
                getSelectedSong(song);
                console.log(song);
                await increDecre.items.update(1, { increDecre: "" });
            }
            // console.log(song);
            // setSelectedIndex(songIndex)
        }
    }, [prevNext]);

    return (
        <Lists>
            {allItems && allItems.length? (
                allItems.map((item) => (
                    <MusicItem
                        getSong={getSong}
                        nowDeleted={nowDeleted}
                        key={item.id}
                        data={item}
                    />
                ))
            ) : (
                <h1>Uploaded music will be listed here:::</h1>
            )}
        </Lists>
    );
};

export default MusicLists;
