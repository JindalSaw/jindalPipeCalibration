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
function inactiveTable() {
    //const [products, setProducts] = useState(null);
    // useEffect(() => {
    //     djacService.getSummaryDetails().then(result => {
    //         setProducts(result);
    //     });
    // }, []);
}

export default inactiveTable;
