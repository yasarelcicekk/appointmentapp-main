// import axios from "axios"
// import { useDispatch } from "react-redux";
// import { getDoctors } from "../redux/doctorActions";

// export default getDoctors= () => {

// const dispatch = useDispatch();

// axios.get('http://localhost:27017/findDoctor', {
//     params: {
//       ID:null
//     }
//   })
//   .then(response => {
//     let data = response.data;
//     if(data){
//         dispatch(getDoctors({data}))
//     }
//     else{
//         console.error('get doctors procces failed:', data.message);
//     }
//   })
//   .catch(function (error) {
//     console.log(`doctors:${error}`);
//   })
//   .finally(function () {
//     // always executed
//   });

// }