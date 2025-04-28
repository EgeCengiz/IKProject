// src/api/config/apiConfig.js
const API_BASE_URL = "http://localhost:8081";
const TOKEN ='eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX0FkbWluIn1dLCJ1c2VybmFtZSI6IkVnZSBDZW5naXogT3J0YWtjxLEiLCJzdWIiOiJFZ2UgQ2VuZ2l6IE9ydGFrY8SxIiwiaWF0IjoxNzQ1MzA1MzE0LCJleHAiOjE3NDU5MTAxMTR9.l6WvHPoERPOnvEKWpDwBkZi5Fh7EWdPZoX9jBhROkG4';
const username ="Ege Cengiz Ortakcı";

const UsersApi = {
  API_BASE_URL,
  TOKEN,
  ENDPOINTS: {
    //User
    GET_USERS_ALL: `${API_BASE_URL}/users/all`,
    POST_USERS_ADD: `${API_BASE_URL}/users/add`,
    POST_USERS_EDUCATION_ADD: `${API_BASE_URL}/users/education/add`,
    PUT_USERS_IMAGES_ADD: `${API_BASE_URL}/users/images/add`,
    GET_USERS_IMAGE: `${API_BASE_URL}/users/images`,
    GET_USERS_BIRTHDAY: `${API_BASE_URL}/users/birthDay`,
    //Permission
    GET_PERMISSION_ALL :`${API_BASE_URL}/permission/all`,
    GET_PERMISSION_STATE:`${API_BASE_URL}/permission/statePermission`,
    PUT_PERMISSON_RESULT :`${API_BASE_URL}/permission/state/update`,
    POST_PERMISSION_PERSON:`${API_BASE_URL}/permission/add`,
    //Details
    GET_PERSON_DETAILS: `${API_BASE_URL}/users/details/`,
    GET_PERSON_DETAILS_PROJECT :`${API_BASE_URL}/users/details/projects/`,
    GET_PERSON_DETAILS_INFORMATION:`${API_BASE_URL}/users/details/information/`,
    GET_PERSON_DETAILS_EDUCATION:`${API_BASE_URL}/users/details/education/`,
    POST_PERSON_DETAILS:`${API_BASE_URL}/users/details/add`,
    //Notes
    GET_NOTES: `${API_BASE_URL}/notes/all/${username}`,
    POST_NOTES:`${API_BASE_URL}/notes/add`,
    DELETE_NOTES:`${API_BASE_URL}/notes/delete`,
    //Calender
    GET_CALENDER_ALL:`${API_BASE_URL}/calender/all`,
    POST_CALENDER_DATA:`${API_BASE_URL}/calender/add`,
    DELETE_CALENDER_DATA:`${API_BASE_URL}/calender/delete`,
    //Public Holiday
    GET_PUBLIC_HOLIDAY:`${API_BASE_URL}/public/holiday/all`,
    //PIE 
    GET_PIE:`${API_BASE_URL}/public/holiday/pie/all`,
    //Deposit 
    GET_DEPOSIT_ALL:`${API_BASE_URL}/deposit/all`,
    GET_DEPOSIT_PERSON_NAME:`${API_BASE_URL}/deposit/person/name`,
    POST_DEPOSIT:`${API_BASE_URL}/deposit/add`,
    //Notices
    GET_NOTICES_ALL:`${API_BASE_URL}/notice/all`,
    POST_NOTICES_ADD:`${API_BASE_URL}/notice/add`,
    //Shift
    GET_SHIFT_ALL:`${API_BASE_URL}/shift/all`,
  
  },
};

export default UsersApi;