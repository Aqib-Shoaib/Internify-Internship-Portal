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
