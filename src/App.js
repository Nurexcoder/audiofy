import React, { useState } from "react";
import UploadForm from "./Components/UploadForm";
import PlayMusic from "./Components/PlayMusic";
import MusicLists from "./Components/MusicLists";
import styled from "styled-components";

// class Example extends React.Component {
//   render() {
//     return (
//       <Form>
//         <legend>Title</legend>
//         <Input label="Required Text Field" required={true} />
//         <Input label="Required Email Address" type="email" floatingLabel={true} required={true} />
//         <Textarea label="Required Textarea" floatingLabel={true} required={true} />
//         <Input label="Email Address" type="email" defaultValue="Validation error" />
//         <Button variant="raised">Submit</Button>
//       </Form>
//     );
//   }
// }

const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100vh;
`;
const App = () => {
    const [wannaUpload, setWannaUpload] = useState();
    const [selectedSong, setSelectedSong] = useState();

    const upload = () => {
        if (wannaUpload) {
            setWannaUpload(false);
        } else {
            setWannaUpload(true);
        }
    };
    const getSelectedSong = (song) => {
        // console.log(song);
        setSelectedSong(song);
    };
    return (
        <Container>
            <UploadForm />

            <PlayMusic selectedSong={selectedSong} />
            <MusicLists getSelectedSong={getSelectedSong} />
        </Container>
    );
};

export default App;
