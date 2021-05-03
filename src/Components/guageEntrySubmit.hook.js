// import { useState } from "react";
// const useGaugeEntryForm = callback => {
//     const [inputs, setInputs] = useState({});

//     const handleSubmit = event => {
//         if (event) {
//             event.preventDefault();
//         }
//         callback();
//     };

//     const handleInputChange = event => {
//         event.persist();
//         if (event.target.name === "file") {
//             setInputs(inputs => ({
//                 ...inputs,
//                 [event.target.name]: event.target.files[0]
//             }));
//         } else {
//             setInputs(inputs => ({
//                 ...inputs,
//                 [event.target.name]: event.target.value
//             }));
//         }
//     };
//     return {
//         handleSubmit,
//         handleInputChange,
//         inputs
//     };
// };

// export default useGaugeEntryForm;
