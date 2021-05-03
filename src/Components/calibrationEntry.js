import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import * as djacService from "./service";
import * as constants from "./constants";
// import useCalibrationEntryForm from "./calibrationEntrySubmit.hook";

const CalibrationEntry = props => {
    const [instruments, setInstrumentNames] = useState(null);
    const [selectedInstrument, setselectedInstrument] = useState(null);
    const [selectedInstrumentId, setselectedInstrumentId] = useState(null);
    const [getFile, setFile] = useState(null);
    const [getInstrument, setInstrument] = useState("");
    const [getIdNo, setIdNo] = useState("");
    const [getCalBy, setCalBy] = useState("");
    const [getCalDate, setCalDate] = useState("");
    const [getTime, setTime] = useState("");
    const [getLocation, setLocation] = useState("");
    const [getdescription, setdescription] = useState("");
    useEffect(() => {
        djacService.getInstrumentNames().then(result => {
            if (result && result.length > 0) {
                setInstrumentNames(result);
                setInstrument(result[0].Instrument);
                djacService
                    .getInstrumentId(result[0].Instrument)
                    .then(result1 => {
                        if (result1.length === 1) {
                            setIdNo(result1[0].ID_No);
                        }
                        setselectedInstrumentId(result1);
                    });
            }
        });
    }, []);
    function onFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData();
        console.log(getIdNo);
        if (getIdNo === "") {
            alert("Please select GAUGE ID");
        } else {
            if (getInstrument) formData.append("instrument", getInstrument);
            if (getIdNo) formData.append("IdNo", getIdNo);
            if (getCalBy) formData.append("calBy", getCalBy);
            if (getCalDate) formData.append("caldate", getCalDate);
            if (getTime) formData.append("time", getTime);
            if (getLocation) formData.append("location", getLocation);
            if (getdescription) formData.append("description", getdescription);
            if (getFile) formData.append("file", getFile);
            const url = constants.calibrationEntryUrl;
            axios
                .post(url, formData)
                .then(result => {
                    if (result.data.returnValue == 1) {
                        alert("Calibration details uploaded successfully");
                    } else {
                        alert(
                            "Failed to upload calibration details. Please report it to IT department"
                        );
                    }
                    props.onHide();
                    window.location.reload();
                })
                .catch(error => {});
        }
    }
    const onChange = e => {
        switch (e.target.name) {
            case "file":
                setFile(e.target.files[0]);
                break;
            case "instrument":
                setInstrument(e.target.value);
                break;
            case "id":
                setIdNo(e.target.value);
                break;
            case "calBy":
                setCalBy(e.target.value);
                break;
            case "calDate":
                setCalDate(e.target.value);
                break;
            case "time":
                setTime(e.target.value);
                break;
            case "Location":
                setLocation(e.target.value);
                break;
            case "Description":
                setdescription(e.target.value);
                break;
        }
    };
    function onInstrumentChange(e) {
        setInstrument(e.target.value);
        djacService.getInstrumentId(e.target.value).then(result => {
            if (result.length === 1) {
                setIdNo(result[0].ID_No);
            }
            setselectedInstrumentId(result);
        });
    }
    function getIdOptions() {
        return (
            selectedInstrumentId &&
            selectedInstrumentId.map((item, index) => {
                return (
                    <option key={index} value={item.ID_No}>
                        {item.ID_No}
                    </option>
                );
            })
        );
    }
    function getOptions() {
        return (
            instruments &&
            instruments.map((item, index) => {
                return (
                    <option key={index} value={item.Instrument}>
                        {item.Instrument}
                    </option>
                );
            })
        );
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
                    Calibration
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form
                    // action="/addCalibrationData"
                    // encType="multipart/form-data"
                    // method="post"
                    // id="calibration-Entry"
                    // target="_self"
                    encType="multipart/form-data"
                    // method="post"
                    id="gauge-Entry"
                    // target="_self"
                    onSubmit={onFormSubmit}
                    // onClick={handleSubmit}
                >
                    <Form.Group controlId="formCalibration">
                        <Form.Label>Name of Instrument:</Form.Label>
                        <Form.Control
                            as="select"
                            placeholder=" Instrument Name"
                            name="instrument"
                            required
                            onChange={e => {
                                onInstrumentChange(e);
                            }}
                        >
                            {getOptions()}
                        </Form.Control>
                        <Form.Label>ID Number:</Form.Label>
                        <Form.Control
                            as="select"
                            placeholder="idNo"
                            name="id"
                            required
                            onChange={onChange}
                        >
                            {getIdOptions()}
                        </Form.Control>
                        <Form.Label>Calibrated By:</Form.Label>
                        <Form.Control
                            type="input"
                            placeholder="Calibrated By"
                            name="calBy"
                            required
                            onChange={onChange}
                        />
                        <Form.Label>Calibration Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="calDate"
                            required
                            onChange={onChange}
                        />
                        <Form.Label>Calibration Frequency in Days:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Days in Numbers"
                            name="time"
                            required
                            onChange={onChange}
                        />

                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="input"
                            placeholder="Location"
                            name="Location"
                            required
                            onChange={onChange}
                        />
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="input"
                            name="Description"
                            onChange={onChange}
                        />
                        <Form.Label>
                            Attachments(Procedures / Quotations) :
                        </Form.Label>
                        <Form.Control
                            type="file"
                            name="file"
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

export default CalibrationEntry;
