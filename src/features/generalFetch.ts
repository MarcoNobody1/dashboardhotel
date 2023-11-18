const APIURL = import.meta.env.VITE_FETCH_URL;

export const getToken = () => {
  return localStorage.getItem("token") || "";
};

interface fetchInterface {
  url: string;
  method?: string;
  data?: any;
}

export const generalFetch = async ({url, method = "GET", data}: fetchInterface): Promise<any> => {
  const response = await fetch(`${APIURL}${url}`, {
    method: method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      "Content-Type": "application/json",
      token: getToken(),
    },
  });
  if (!response.ok) throw new Error(`Status: ${response.status}`);
  const json = await response.json();
  return json;
};
