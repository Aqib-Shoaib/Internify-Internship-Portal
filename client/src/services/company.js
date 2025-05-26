import { BACKEND_URL, manageError } from "@/constants";
import axios from "axios";

const token = localStorage.getItem("authToken");

export async function getCompanyStats() {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/companystats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { status: res.status, data: res.data.data };
  } catch (err) {
    const msg = manageError(err);
    return { message: msg, status: err.status };
  }
}

export async function getLatestJobPostings() {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/internships/company?limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: response.data.data, status: response.status };
  } catch (err) {
    return { message: manageError(err), status: err.status };
  }
}

export async function getAllInternships() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/internships/company`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data.data, status: response.status };
  } catch (err) {
    return { message: manageError(err), status: err.status };
  }
}
export async function createInternship(data) {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/internships/company`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: response.data.data, status: response.status };
  } catch (err) {
    return { message: manageError(err), status: err.status };
  }
}
export async function getAllCandidates() {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/applications/candidates`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: response.data.data, status: response.status };
  } catch (err) {
    console.log(err);
    return { message: manageError(err), status: err.status };
  }
}
export async function updateApplicationStatus(applicatinId, statusValue) {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/applications/company/status/${applicatinId}`,
      { status: statusValue },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { data: response.data.data, status: response.status };
  } catch (err) {
    console.log(err);
    return { message: manageError(err), status: err.status };
  }
}
