// src/api/config/apiConfig.js
const API_BASE_URL = "http://localhost:8081";
const TOKEN ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbXSwidXNlcm5hbWUiOiJFZ2UgQ2VuZ2l6IE9ydGFrY8SxIiwic3ViIjoiRWdlIENlbmdpeiBPcnRha2PEsSIsImlhdCI6MTc0NDcxNDc3NSwiZXhwIjoxNzQ1MzE5NTc1fQ.ya35O6Gm72iy3kJ6T6k5t7lJdw6LKBe9IzctOOF_5bo';
const username ="Ege Cengiz Ortakcı"

const UsersApi = {
  API_BASE_URL,
  TOKEN,
  ENDPOINTS: {
    //User
    GET_USERS_ALL: `${API_BASE_URL}/users/all`,
    //Permission
    GET_PERMISSION_ALL :`${API_BASE_URL}/permission/all`,
    GET_PERMISSION_STATE:`${API_BASE_URL}/permission/statePermission`,
    PUT_PERMISSON_RESULT :`${API_BASE_URL}/permission/state/update`,
    //Details
    GET_PERSON_DETAILS: `${API_BASE_URL}/users/details/`,
    GET_PERSON_DETAILS_PROJECT :`${API_BASE_URL}/users/details/projects/`,
    GET_PERSON_DETAILS_INFORMATION:`${API_BASE_URL}/users/details/information/`,
    GET_PERSON_DETAILS_EDUCATION:`${API_BASE_URL}/users/details/education/`,
    //Notes
    GET_NOTES: `${API_BASE_URL}/notes/all/${username}`,
    //Calender
    GET_CALENDER_ALL:`${API_BASE_URL}/calender/all`,
    POST_CALENDER_DATA:`${API_BASE_URL}/calender/add`,
    DELETE_CALENDER_DATA:`${API_BASE_URL}/calender/delete`
  
  },
};

export default UsersApi;