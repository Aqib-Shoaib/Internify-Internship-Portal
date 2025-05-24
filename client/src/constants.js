export const BACKEND_URL = "http://localhost:3000";

export function manageError(error) {
  return (
    error?.response?.data?.message || error?.message || "Something went wrong"
  );
}
