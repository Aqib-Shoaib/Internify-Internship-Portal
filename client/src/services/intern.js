import { BACKEND_URL, manageError } from "@/constants";
import axios from "axios";

const token = localStorage.getItem("authToken");

export async function getProfileCompletionProgress(userId) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/completion/intern/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (err) {
    const msg = manageError(err);
    console.log(msg);
  }
}

export async function getApplicationStats(userid) {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/applications/stats/${userid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    const msg = manageError(err);
    return msg;
  }
}

export async function getLatestApplications() {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/applications/my?limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    return manageError(err);
  }
}
export async function getAllApplications() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/applications/my`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    return manageError(err);
  }
}
export async function uploadResumeFile(fileData) {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/uploadResume`,
      fileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
    return manageError(err);
  }
}
export async function deleteResumeFile(id) {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/deleteResume/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    console.log(err);
    return manageError(err);
  }
}
export async function updatePassword(data) {
  try {
    // newPassword, currentPassword
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = { user: response.data.data, status: response.status };
    return result;
  } catch (err) {
    const error = { message: manageError(err), status: err.status };
    return error;
  }
}
export async function savedInternships() {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/users/savedInternships`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data;
  } catch (err) {
    return manageError(err);
  }
}
export async function saveInternship(id, shouldSave = true) {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/users/saveInternships/${id}`,
      { save: shouldSave },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data: response.data.data, status: response.status };
  } catch (err) {
    console.log(err);
    return manageError(err);
  }
}
export async function applyForInternship(data) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/applications/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data: response.data.data, status: response.status };
  } catch (err) {
    console.log(err);
    return manageError(err);
  }
}
