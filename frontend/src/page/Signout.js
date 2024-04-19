import { useDispatch } from "react-redux";
import { logout } from "../redux/authActions";
import { useNavigate } from 'react-router-dom';
import axios from "axios"


export default function Signout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  axios
    .post('http://localhost:27017/signout')
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        console.log('Logout successful:');
        dispatch(logout());
        navigate("/")
      } else {
        console.error('Logout failed:', response.data.message);
      }
    })
    .catch(error => {
      console.error('Error during logout:', error.response.data.message);
    });
}



