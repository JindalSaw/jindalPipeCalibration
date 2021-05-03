import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import cellEditFactory from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ToolkitProvider, {
    Search,
    CSVExport
} from "react-bootstrap-table2-toolkit";

import GaugeEntry from "./guageEntry";
import CalibrationEntry from "./calibrationEntry";
import { Button } from "react-bootstrap";
import columns from "./tableColumns";
import * as djacService from "./service";
import axios from "axios";
import * as constants from "./constants";
import UploadEntry from "./uploadEntry";

const ProductionTable = props => {
    const { ExportCSVButton } = CSVExport;
    const { SearchBar } = Search;
    const [products, setProducts] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShowUpload, setModalShowUpload] = useState(false);
    const [selectedRow, setSelectedRow] = useState("");
    const [uploadId, setUploadId] = useState();
    const [deleteId, setDeleteId] = useState();
    const [inActiveId, setInActiveId] = useState();
    const [disableDelete, setDisableDelete] = useState(false);
    const [inActive, setInActive] = useState(false);
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        clickToEdit: true,
        style: { backgroundColor: "#f0929d" },
        // onSelectAll: (isSelect, rows) => {
        //     if (!isSelect) {
        //         setIds("");
        //     }
        // },
        onSelect: (row, isSelect, rowIndex, e) => {
            let isActive = inActive;
            setSelectedRow(row);
            if (isSelect) {
                if (isActive) {
                    setInActiveId(row.ID_No);
                } else {
                    setDeleteId(row.ID_No);
                }
            }
            if (row.FileName != null && isSelect && isActive === false) {
                setUploadId(row.ID_No);
            } else {
                setUploadId(null);
            }
        }
    };
    const handleClick = () => {
        window.location.href = "/";
    };
    const handleInactiveClick = () => {
        setInActive(null);
        setDeleteId(null);
        setUploadId(null);
        djacService.getInActiveDetails().then(result => {
            setProducts(result);
        });
        setInActive(true);
    };
    function beforeSaveCell(oldValue, newValue, row, column, done) {
        let tableName = "";
        if (oldValue !== newValue) {
            if (
                column.dataField == "Description" ||
                column.dataField == "PartNo" ||
                column.dataField == "SerialNo" ||
                column.dataField == "Instrument" ||
                column.dataField == "ID_No"
            ) {
                tableName = "0";
            } else {
                tableName = "1";
            }
            let url =
                constants.updateTablesUrl +
                "/" +
                tableName +
                "/" +
                column.dataField +
                "/" +
                row.Instrument +
                "/" +
                row.ID_No +
                "/" +
                newValue;
            axios({
                method: "post",
                url: url,
                headers: { "Content-Type": "application/json" }
            })
                .then(function(response) {
                    //handle success
                    console.log(response + "success");
                })
                .catch(function(response) {
                    //handle error
                    console.log(response);
                });
            return <Redirect to="/productionTable" />;
        }
        return { async: true };
    }

    useEffect(() => {
        djacService.getSummaryDetails().then(result => {
            setProducts(result);
        });
    }, []);

    return (
        <div>
            <div>
                <Button
                    variant="primary"
                    onClick={() => window.location.reload()}
                >
                    Summary
                </Button>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    + New Gauge Entry
                </Button>
                <Button variant="primary" onClick={() => setModalShow1(true)}>
                    + New Calibration
                </Button>
                <Button
                    variant="primary"
                    disabled={inActive || deleteId ? false : true}
                    onClick={() => {
                        let isActive = inActive;
                        if (isActive) {
                            let result = window.confirm(
                                "Do you want to Active - yes / no ?"
                            );
                            if (result) {
                                setInActive(null);
                                let url =
                                    constants.activateInstrumentByIdUrl +
                                    "/" +
                                    encodeURIComponent(inActiveId);
                                // console.log(url);
                                axios({
                                    method: "post",
                                    url: url,
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(result => {
                                    window.location.reload();
                                });
                            }
                        } else {
                            let result = window.confirm(
                                "Do you want to delete - yes / no ?"
                            );
                            if (result) {
                                setDeleteId(null);
                                let url =
                                    constants.deleteInstrumentUrl +
                                    "/" +
                                    encodeURIComponent(deleteId);
                                axios({
                                    method: "post",
                                    url: url,
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(result => {
                                    window.location.reload();
                                    // return <Redirect to="/productionTable" />;
                                });
                            }
                        }
                    }}
                >
                    {inActive ? "Active" : "Delete"}
                </Button>
                <Button
                    variant="primary"
                    disabled={!uploadId}
                    onClick={() => setModalShowUpload(true)}
                >
                    File Reupload
                </Button>
                <Link
                    to={{
                        pathname: "/gaugeHistory"
                    }}
                >
                    <Button variant="primary">Gauge History</Button>
                </Link>

                <Button variant="primary" onClick={handleInactiveClick}>
                    Inactive Gauge
                </Button>

                <button className="logout" onClick={handleClick}>
                    LogOut
                </button>
            </div>
            {modalShowUpload && (
                <UploadEntry
                    selectedRow={selectedRow}
                    show={modalShowUpload}
                    onHide={() => setModalShowUpload(false)}
                />
            )}
            {modalShow1 && (
                <CalibrationEntry
                    show={modalShow1}
                    onHide={() => setModalShow1(false)}
                />
            )}
            {modalShow && (
                <GaugeEntry
                    props={props}
                    show={modalShow}
                    onHide={() => {
                        setModalShow(false);
                    }}
                />
            )}

            {products && products.length > 0 && (
                <ToolkitProvider
                    keyField="ID_No"
                    data={products}
                    columns={columns}
                    search
                    exportCSV
                >
                    {props => (
                        <div>
                            <br />

                            <div className="floatRight">
                                <SearchBar {...props.searchProps} />
                            </div>
                            <ExportCSVButton
                                {...props.csvProps}
                                className="btn btn-primary floatRight"
                            >
                                Export in a CSV!!
                            </ExportCSVButton>
                            <div
                                className={
                                    inActive ? "table-inActive" : "table"
                                }
                            >
                                <BootstrapTable
                                    keyField="ID_No"
                                    data={products}
                                    columns={columns}
                                    {...props.baseProps}
                                    selectRow={selectRow}
                                    cellEdit={cellEditFactory({
                                        mode: "dbclick",
                                        beforeSaveCell
                                    })}
                                />
                            </div>
                        </div>
                    )}
                </ToolkitProvider>
            )}
        </div>
    );
};

export default ProductionTable;
