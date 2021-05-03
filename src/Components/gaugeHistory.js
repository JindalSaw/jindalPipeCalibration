import React, { useState, useEffect } from "react";
import historyColumns from "./tableHistoryColumns";
import * as djacService from "./service";

import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as constants from "./constants";

function GaugeHistory() {
    const [products, setProducts] = useState(null);
    // const [products, setProducts] = useState(null);
    let input;
    const handleClick = () => {
        setProducts(null);
        djacService.getHistoryDetails(input.value).then(result => {
            setProducts(result);
        });
    };
    // const rowEvents = {
    //     onClick: (e, row, rowIndex) => {
    //         console.log(`clicked on row with index: ${rowIndex}`);
    //         console.log(row);
    //     }
    // // };

    const downloadURI = res => {
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
    };

    const Download = id => {
        let getInstrumentFileUrl = constants.getInstrumentFileUrl + id;
        fetch(getInstrumentFileUrl)
            .then(response => response.json())
            .then(jsonRes => {
                downloadURI(jsonRes);
            });
    };
    var labelStyle = {
        marginRight: "10px",
        fontSize: 22,
        color: "#06486b"
    };
    var quoteStyle = {
        marginTop: "10px",
        fontSize: 20,
        color: "#06486b"
    };

    return (
        <div className="totalPage">
            <div>
                <div className="gaugeHistory">
                    <h3>Gauge History</h3>
                </div>
                <div className="example">
                    <label style={labelStyle}>
                        Search by Instrument ID No:
                    </label>

                    <input
                        className="form-control"
                        style={{ backgroundColor: "white", width: "200px" }}
                        ref={n => (input = n)}
                        type="text"
                    />
                </div>
                <button className="btn-warning" onClick={handleClick}>
                    Search
                </button>
            </div>

            <div>
                <label style={quoteStyle}> Quote/Procedure:</label>
                {products && products.length !== 0 && (
                    <a
                        href="#"
                        onClick={() => {
                            Download(products[0].ID_No);
                        }}
                    >
                        {products[0].InstruFileName}
                    </a>
                )}
            </div>
            {products && products.length > 0 && (
                <div className="table">
                    <BootstrapTable
                        keyField="ID_No"
                        data={products}
                        columns={historyColumns}
                        // rowEvents={rowEvents}
                        // {...props.baseProps}
                    />
                </div>
            )}

            {products && products.length === 0 && <span>No data Found</span>}
        </div>
    );
}

export default GaugeHistory;
