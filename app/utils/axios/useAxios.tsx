import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import useFeedbackAlertStore from "../../stores/useFeedbackAlertStore";

const BASE_URI = "http://192.168.1.4:3000";

const useAxios = () => {
  type ResponseType = AxiosResponse<any, any> | null;

  const [response, setResponse] = useState<ResponseType>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showFeedback } = useFeedbackAlertStore();

  const instance = axios.create({
    baseURL: BASE_URI,
    timeout: 10000,
  });

  interface AxiosTypes {
    url: string;
    method: "GET" | "POST" | "PATCH" | "DELETE";
    data?: Record<string, any>;
    headers?: Record<string, string>;
  }

  const AxiosRequest = async ({
    url,
    method,
    data = {},
    headers = {},
  }: AxiosTypes) => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem("token");
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

      const finalHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...authHeader,
        ...headers,
      };

      const result = await instance({
        url,
        method,
        data,
        headers: finalHeaders,
      });

      setResponse(result);
      return result;
    } catch (err: any) {
      console.log("Axios Error:", err);

      if (axios.isAxiosError(err)) {
        const serverMessage =
          err.response?.data?.message ||
          err.response?.data?.error ||
          err.message ||
          "An unexpected error occurred";

        console.log("Axios error response data:", err.response?.data);

        setError(serverMessage);
        showFeedback(serverMessage, "failed");
        throw new Error(serverMessage);
      } else {
        const unknownErr = err?.message || "Unknown error occurred";
        setError(unknownErr);
        showFeedback(unknownErr, "failed");
        throw new Error(unknownErr);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    response,
    error,
    loading,
    AxiosRequest,
  };
};

export default useAxios;
