import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import * as constants from "./constants";

const UploadEntry = props => {
    const [getFile, setFile] = useState(null);
    function onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        if (getFile) {
            formData.append("file", getFile);
            if (props.selectedRow)
                formData.append("instrument", props.selectedRow.Instrument);
            if (props.selectedRow)
                formData.append("id_no", props.selectedRow.ID_No);
            const url = constants.updateCalibrationFileUrl;
            axios
                .post(url, formData)
                .then(result => {
                    if (result.data.returnValue == 1) {
                        alert("The file is successfully uploaded");
                    } else {
                        alert("The file is not uploaded, please try again.");
                    }
                    props.onHide();
                })
                .catch(error => {});
        } else {
            alert("Please upload  file ");
        }
    }

    const onChange = e => {
        switch (e.target.name) {
            case "file":
                setFile(e.target.files[0]);
                break;
        }
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Upload
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    encType="multipart/form-data"
                    id="upload-Entry"
                    onSubmit={onFormSubmit}
                >
                    <Form.Group controlId="formInstrument">
                        <Form.Label>
                            Attachments(Procedures / Quotations) :
                        </Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
                            label="File"
                            onChange={onChange}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" value="Upload">
                        Submit
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UploadEntry;
