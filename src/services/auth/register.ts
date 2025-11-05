import type { ISignUp } from "../../types/requests/IAuth";
import { apiClient } from "../config";

async function register(data: ISignUp) {
  // Ensure all required fields are present
  const apiData = {
    email: data.email || '',
    password1: data.password || '',
    password2: data.confirmPassword || '',
    first_name: data.firstName || '',
    last_name: data.lastName || '',
    company_name: data.companyName || '',
    phone_number: data.phoneNumber || '',
  };

  console.log('🔧 Debug - Final registration data being sent:', apiData);
  
  try {
    const res = await apiClient.post("/api/auth/register/", apiData);
    console.log('✅ Debug - Registration successful:', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ Debug - Registration failed:', error.response?.data);
    throw error;
  }
}

export default register;