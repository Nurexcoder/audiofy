import React, { useState } from "react";
import styled from "styled-components";
import Dexie from "dexie";
import { useLiveQuery } from "dexie-react-hooks";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const StyledForm = styled(Form)`
    flex: 1;
    margin: 10px 30px;
`;
const Title = styled.h1``;
const NewButton = styled(Button)``;
// const Button = styled.button``;

const db = new Dexie("SongData");
db.version(1).stores({
    items: "++id,songName,singerName,genreName,inputImage,song",
});
const UploadForm = () => {
    const [formData, setFormData] = useState({
        songName: "",
        singerName: "",
        genreName: "",
        inputImage: "",
        song: "",
    });
    const [wannaUpload, setWannaUpload] = useState(false);
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const inputImageHandler = (e) => {
        const { name } = e.target;
        const value = e.target.files;
        setFormData((prevState) => ({
            ...prevState,
            [name]: new Blob(value),
        }));
    };
    const inputAudioHandler = (e) => {
        const { name } = e.target;
        const value = e.target.files;
        // console.log(e.target.files[0]);
        setFormData((prevState) => ({
            ...prevState,
            [name]: new Blob(value),
        }));
    };
    const allItems = useLiveQuery(() => db.items.toArray(), []);
    // console.log(allItems);
    let image = "";
    const submitHandler = async (e) => {
        e.preventDefault();
        const { songName, singerName, genreName, inputImage, song } = formData;

        await db.items.add({
            songName,
            singerName,
            genreName,
            inputImage,
            song,
        });

        //    image=JSON.stringify(allItems[0].song)
        //    console.log(image);
        // console.log(formData);
    };

    // console.log(image);
    return (
        <StyledForm onSubmit={submitHandler}>
            <Title>Upload a Song</Title>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Name of the Song: *</Form.Label>
                <Form.Control
                    name='songName'
                    type='text'
                    placeholder='Enter a name'
                    onChange={inputHandler}
                    required={true}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Name of the Singer(Optional):</Form.Label>
                <Form.Control
                    name='singerName'
                    type='text'
                    placeholder='Enter a name'
                    onChange={inputHandler}
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Name of genre(Optional):</Form.Label>
                <Form.Control
                    name='genre'
                    type='text'
                    placeholder='Enter a name'
                    onChange={inputHandler}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Cover Image(Optional):</Form.Label>
                <Form.Control
                    name='inputImage'
                    type='file'
                    onChange={inputImageHandler}
                />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Select a Song*:</Form.Label>
                <Form.Control
                    name='song'
                    type='file'
                    onChange={inputAudioHandler}
                    required={true}
                />
            </Form.Group>

            <NewButton variant='primary' type='submit'>
                Submit
            </NewButton>
        </StyledForm>
    );
};

export default UploadForm;
