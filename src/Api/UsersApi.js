// src/api/config/apiConfig.js
const API_BASE_URL = "http://localhost:8081";
const TOKEN = localStorage.getItem("token");
const username =localStorage.getItem('username');

const UsersApi = {
  API_BASE_URL,
  TOKEN,
  username,
  ENDPOINTS: {
    //User
    GET_USERS_ALL: `${API_BASE_URL}/users/all`,
    GET_USERS_SEARCH: `${API_BASE_URL}/users/search`,
    POST_USERS_ADD: `${API_BASE_URL}/users/add`,
    POST_USERS_EDUCATION_ADD: `${API_BASE_URL}/users/education/add`,
    PUT_USERS_IMAGES_ADD: `${API_BASE_URL}/users/images/add`,
    GET_USERS_IMAGE: `${API_BASE_URL}/users/images`,
    GET_USERS_BIRTHDAY: `${API_BASE_URL}/users/birthDay`,
    POST_LOGIN: `${API_BASE_URL}/users/login`,
    //Permission
    GET_PERMISSION_ALL :`${API_BASE_URL}/permission/all`,
    GET_PERMISSION_STATE:`${API_BASE_URL}/permission/statePermission`,
    PUT_PERMISSON_RESULT :`${API_BASE_URL}/permission/state/update`,
    POST_PERMISSION_PERSON:`${API_BASE_URL}/permission/add`,
    GET_YEAR_DETAILS:`${API_BASE_URL}/permission/yearDetails`,
    GET_PERMISSION_SEARCH:`${API_BASE_URL}/permission/search`,
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
    PUT_DEPOSIT_STATE:`${API_BASE_URL}/deposit/state`,
    DELETE_DEPOSIT:`${API_BASE_URL}/deposit/delete`,
    //Notices
    GET_NOTICES_ALL:`${API_BASE_URL}/notice/all`,
    POST_NOTICES_ADD:`${API_BASE_URL}/notice/add`,
    POST_NOTICE_FILE_UPLOAD:`${API_BASE_URL}/notice/file/upload`,
    GET_NOTICE_FILE:`${API_BASE_URL}/notice/file`,
    DELETE_NOTICE:`${API_BASE_URL}/notice/delete`,
    PUT_NOTICE:`${API_BASE_URL}/notice/update`,
    //Shift
    GET_SHIFT_ALL:`${API_BASE_URL}/shift/all`,
    GET_SHIFT_SEARCH:`${API_BASE_URL}/shift/search`,
    POST_SHIFT:`${API_BASE_URL}/shift/add`,
    //Notification
    POST_NOTIFICATION:`${API_BASE_URL}/notification/post`,
    GET_NOTIFICATION:`${API_BASE_URL}/notification/data`,
    GET_NOTIFICATION_STATE:`${API_BASE_URL}/notification/data/state`,
    GET_NOTIFICATION_OPEN:`${API_BASE_URL}/notification/data/open`,
    DELETE_NOTIFICATION:`${API_BASE_URL}/notification/delete`,
  
  },
};

export default UsersApi;