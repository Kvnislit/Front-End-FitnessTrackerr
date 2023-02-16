// export const fetchRoutines = async (token) => {
//     try {
//         const response = await fetch("http://fitnesstrac-kr.herokuapp.com/api/routines", {
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         return await response.json();
//     } catch (error) {
//         return console.error(error);
//     }
//   };