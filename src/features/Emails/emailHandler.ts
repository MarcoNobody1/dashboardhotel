import { getToken } from "../generalFetch";

const APIURL = import.meta.env.VITE_FETCH_URL;

export async function sendEmail(subject: string, text: string): Promise<void> {
    try {
      const response = await fetch(`${APIURL}send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: getToken(),
        },
        body: JSON.stringify({
          subject,
          text,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  