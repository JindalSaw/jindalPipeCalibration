import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { jQuery } from "jquery";
import axios from "axios";
import * as constants from "./constants";

function GaugeEntry(props) {
    function _SubmitForm(e) {
        e.preventDefault();

        var form = document.forms["gauge-Entry"];
        let instrument = form.instrument.value;
        let IdNo = form.IdNo.value;
        let modelNo = form.modelNo.value;
        let serialNo = form.serialNo.value;
        let description = form.description.value;
        let file = form.file.files[0];

        let bodyFormData = new FormData();
        bodyFormData.set("instrument", instrument);
        bodyFormData.set("IdNo", IdNo);
        bodyFormData.set("modelNo", modelNo);
        bodyFormData.set("serialNo", serialNo);
        bodyFormData.set("description", description);
        bodyFormData.append("file", file);

        console.log("file=======>", file);

        axios({
            method: "post",
            url: constants.gaugeEntryUrl,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(function(response) {
                //handle success
                console.log("success");
            })
            .catch(function(response) {
                //handle error
                console.log(response);
            });

        window.location.assign("/");
    }

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
                <Form
                    encType="multipart/form-data"
                    // method="post"
                    id="gauge-Entry"
                    target="_self"
                    onSubmit={e => {
                        _SubmitForm(e);
                    }}
                >
                    <Form.Group controlId="formInstrument">
                        <Form.Label>Name of Instrument:</Form.Label>
                        <Form.Control
                            type="input"
                            name="instrument"
                            placeholder=" Instrument Name"
                            required
                        />
                        <Form.Label>ID Number:</Form.Label>
                        <Form.Control
                            type="input"
                            name="IdNo"
                            placeholder="ID No"
                            required
                        />
                        <Form.Label>Model No/PartNo:</Form.Label>
                        <Form.Control
                            type="input"
                            name="modelNo"
                            placeholder="Model/Part#"
                            required
                        />
                        <Form.Label>Serial Number:</Form.Label>
                        <Form.Control
                            type="input"
                            name="serialNo"
                            placeholder="Serial#"
                            required
                        />
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="comment"
                            name="description"
                            required
                        />
                        <Form.Label>
                            Attachments(Procedures / Quotations) :
                        </Form.Label>
                        <Form.Control type="file" name="file" label="File" />
                        {/* <input type="file" name="file" /> */}
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        // id="my-submit"
                    >
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default GaugeEntry;
