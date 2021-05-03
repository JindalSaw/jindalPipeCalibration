import React, { useState } from "react";
import * as constants from "./constants";
import moment from "moment";
// import UploadEntry from "./uploadEntry";
// import { Button, Modal } from "react-bootstrap";

//const [getShowUpload, setShowUpload] = useState(false);

export const columns = [
    {
        dataField: "Instrument",
        text: "Instrument",
        editable: false
    },
    {
        dataField: "ID_No",
        text: "Id No",
        editable: false
    },
    {
        dataField: "SerialNo",
        text: "Serial No",
        editable: true
    },
    {
        dataField: "PartNo",
        text: "Part No",
        editable: true
    },
    {
        dataField: "Description",
        text: "Description",
        editable: true
    },
    {
        dataField: "FileName",
        text: "Certification File",
        editable: false,

        formatter: (cell, row, rowIndex) => {
            function downloadURI(res) {
                if (res.fileName.toLowerCase().indexOf("pdf") !== -1) {
                    var blob = new Blob([
                        new Int8Array(res.FileData.data),
                        { type: "application/pdf" }
                    ]);
                    var url = URL.createObjectURL(blob);
                    var link = document.createElement("a");
                    link.download = res.fileName;
                    link.href = url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }

            return (
                cell != null && (
                    <div>
                        <u>
                            <a
                                href="#"
                                onClick={el => {
                                    let getFielUrl =
                                        constants.getFielUrl + cell;
                                    fetch(getFielUrl)
                                        .then(response => response.json())
                                        .then(jsonRes => {
                                            downloadURI(jsonRes);
                                        });
                                    el.preventDefault();
                                    return false;
                                }}
                            >
                                {cell ? cell : " "}
                            </a>
                        </u>
                    </div>
                )
            );
        }
    },
    {
        dataField: "CalibratedBy",
        text: "Calibrated By",
        editable: true
    },
    {
        dataField: "CalibrationDate",
        text: "Calibration Date",
        editable: false,
        formatter: cell => {
            if (!cell) {
                return "";
            }
            return `${
                moment(cell).format("DD-MM-YYYY")
                    ? moment(cell).format("MM-DD-YYYY")
                    : moment(cell).format("MM-DD-YYYY")
            }`;
        }
    },
    {
        dataField: "NextDueDate",
        text: "Next Due Date",
        editable: false,
        formatter: (cell, row) => {
            if (!cell) {
                return "";
            }
            var formattedDate = moment(cell).format("DD-MM-YYYY")
                ? moment(cell).format("MM-DD-YYYY")
                : moment(cell).format("MM-DD-YYYY");
            var today = moment().format("MM-DD-YYYY");
            var targetDay = moment(formattedDate).format("MM-DD-YYYY");
            var a = moment(today);
            var b = moment(targetDay);

            var c = b.diff(a, "days");

            if (c <= 30) {
                return (
                    <strong style={{ color: "red" }}>{formattedDate}</strong>
                );
            } else {
                return formattedDate;
            }
        }
    },
    {
        dataField: "Remarks",
        text: "Remarks",
        editable: true
    },
    {
        dataField: "Location",
        text: "Location",
        editable: true
    }
];

export default columns;
