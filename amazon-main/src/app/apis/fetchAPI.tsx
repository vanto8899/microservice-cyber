import axios from "axios";

const DOMAIN_BE = "http://localhost:8080";

export const login = async (model: any) => {
  const { data } = await axios.post(`${DOMAIN_BE}/auth/login`, model);

  return data;
};

export const searchProduct = async (name: any, page: any) => {
  // const { data } = await axios.get(
  //   `${DOMAIN_BE}/product/search-pagination?name=${name}&page=${page}`
  // );
  const { data } = await axios.get(`${DOMAIN_BE}/product/get-all`);
  return data;
};
