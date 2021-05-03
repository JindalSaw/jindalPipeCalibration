import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Redirect, withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import axios from "axios";
import * as constants from "./constants";

const GaugeEntry = props => {
    const [getFile, setFile] = useState(null);
    const [getInstrument, setInstrument] = useState("");
    const [getIdNo, setIdNo] = useState("");
    const [getmodelNo, setmodelNo] = useState("");
    const [getserialNo, setserialNo] = useState("");
    const [getdescription, setdescription] = useState("");
    //const [getSubmitState, setSubmitState] = useState(undefined);
    function onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        if (getInstrument) formData.append("instrument", getInstrument);
        if (getIdNo) formData.append("IdNo", getIdNo);
        if (getmodelNo) formData.append("modelNo", getmodelNo);
        if (getserialNo) formData.append("serialNo", getserialNo);
        if (getdescription) formData.append("description", getdescription);
        if (getFile) formData.append("file", getFile);

        const url = constants.gaugeEntryUrl;
        axios
            .post(url, formData)
            .then(result => {
                if (result.data.returnValue == 1) {
                    alert("New Gauge added succesfully");
                } else {
                    alert(
                        "New gauge entry failed to upload, since entered ID no. already exists!!! "
                    );
                }
                props.onHide();
                window.location.reload();
            })
            .catch(error => {});
    }

    const onChange = e => {
        switch (e.target.name) {
            case "file":
                setFile(e.target.files[0]);
                break;
            case "instrument":
                setInstrument(e.target.value);
                break;
            case "IdNo":
                setIdNo(e.target.value);
                break;
            case "modelNo":
                setmodelNo(e.target.value);
                break;
            case "serialNo":
                setserialNo(e.target.value);
                break;
            case "description":
                setdescription(e.target.value);
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
                    Gauge Entry
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    encType="multipart/form-data"
                    id="gauge-Entry"
                    onSubmit={onFormSubmit}
                >
                    <Form.Group controlId="formInstrument">
                        <Form.Label>Name of Instrument:</Form.Label>
                        <Form.Control
                            type="input"
                            name="instrument"
                            placeholder=" Instrument Name"
                            required
                            value={getInstrument.instrument}
                            onChange={onChange}
                        />
                        <Form.Label>ID Number:</Form.Label>
                        <Form.Control
                            type="input"
                            name="IdNo"
                            placeholder="ID No"
                            required
                            value={getIdNo.IdNo}
                            onChange={onChange}
                        />
                        <Form.Label>Model No/PartNo:</Form.Label>
                        <Form.Control
                            type="input"
                            name="modelNo"
                            placeholder="Model/Part#"
                            required
                            onChange={onChange}
                        />
                        <Form.Label>Serial Number:</Form.Label>
                        <Form.Control
                            type="input"
                            name="serialNo"
                            placeholder="Serial#"
                            required
                            onChange={onChange}
                        />
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="comment"
                            name="description"
                            required
                            onChange={onChange}
                        />
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

export default withRouter(GaugeEntry);
