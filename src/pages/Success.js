// import React, { useEffect } from "react";

// function Success() {
//   const parsedId = localStorage.getItem("sessionId").id;
//   const headers = {
//     "Content-Type": "application/json",
//   };

//   useEffect(() => {
//     parsedId &&
//       fetch("http://localhost:8800/api/checkout/retrieve-checkout-session", {
//         method: "POST",
//         headers: headers,
//         sessionId: JSON.parse(localStorage.getItem("sessionId")).id,
//       });
//   });

//   return <div></div>;
// }

// export default Success;
