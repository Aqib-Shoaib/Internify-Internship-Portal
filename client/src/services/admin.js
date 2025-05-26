import { BACKEND_URL, manageError } from "@/constants";
import axios from "axios";

const token = localStorage.getItem("authToken");

export async function getSystemStats() {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/systemStats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: res.status, data: res.data.data };
  } catch (err) {
    return { status: err.status, message: manageError(err) };
  }
}

export async function getActivitySummary() {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/activitySummary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: res.status, data: res.data.data };
  } catch (err) {
    return { status: err.status, message: manageError(err) };
  }
}
export async function getAllUsersForAdmin() {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: res.status, data: res.data.data };
  } catch (err) {
    return { status: err.status, message: manageError(err) };
  }
}
export async function CompaniesPendingVerification() {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/api/users/companiesVerification`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: res.status, data: res.data.data };
  } catch (err) {
    return { status: err.status, message: manageError(err) };
  }
}
export async function internshipsPendingVerification() {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/api/internships/admin?verified=false`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: res.status, data: res.data.data };
  } catch (err) {
    return { status: err.status, message: manageError(err) };
  }
}
export async function verifyCompany(id) {
  try {
    const res = await axios.patch(
      `${BACKEND_URL}/api/users/verify/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: res.status, data: res.data.data };
  } catch (err) {
    return { status: err.status, message: manageError(err) };
  }
}
export async function verifyInternship(id) {
  try {
    const res = await axios.patch(
      `${BACKEND_URL}/api/internships/admin/verify/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { status: res.status, data: res.data.data };
  } catch (err) {
    return { status: err.status, message: manageError(err) };
  }
}
export async function createAdmin(data) {
  try {
    const res = await axios.post(`${BACKEND_URL}/api/users/createAdmin`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: res.status, data: res.data.data };
  } catch (err) {
    console.log(err);
    return { status: err.status, message: manageError(err) };
  }
}
