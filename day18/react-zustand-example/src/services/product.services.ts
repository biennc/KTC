import apiClient from "../libs/api-client";

export const getAllProducts = async () => {
  const productsData = await apiClient.get("/products");
  return productsData;
};
