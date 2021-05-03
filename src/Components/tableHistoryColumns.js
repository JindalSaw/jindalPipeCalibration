import React from "react";
import * as constants from "./constants";
import moment from "moment";

export const historyColumns = [
    {
        dataField: "Instrument",
        text: "Instrument"
    },
    {
        dataField: "ID_No",
        text: "Id No"
    },
    {
        dataField: "SerialNo",
        text: "Serial No"
    },
    {
        dataField: "PartNo",
        text: "Part No"
    },
    {
        dataField: "Description",
        text: "Description"
    },
    {
        dataField: "FileName",
        text: "File Name",

        formatter: (cell, row, rowIndex) => {
            function downloadURI(res) {
                if (res.fileName.indexOf("pdf") !== -1) {
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
                    // delete link;
                }
            }
            return (
                <div>
                    <u>
                        <a
                            href="#"
                            onClick={el => {
                                let getFielUrl = constants.getFielUrl + cell;
                                fetch(getFielUrl)
                                    .then(response => response.json())
                                    .then(jsonRes => {
                                        downloadURI(jsonRes);
                                    });
                            }}
                        >
                            {cell}
                        </a>
                    </u>
                </div>
            );
        }
    },
    {
        dataField: "CalibratedBy",
        text: "Calibrated By"
    },

    {
        dataField: "CalibrationDate",
        text: "Calibration Date",
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
        dataField: "TimePeriod",
        text: "Time Period"
    },
    {
        dataField: "NextDueDate",
        text: "Next Due Date",
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
        dataField: "Remarks",
        text: "Remarks"
    },
    {
        dataField: "Location",
        text: "Location"
    },
    {
        dataField: "Revision",
        text: "Revision"
    }
];

export default historyColumns;
