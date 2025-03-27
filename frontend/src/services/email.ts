import axios from "axios"

const baseUrl = "/api/emails"

export async function sendContactEmail(name: string, html: string) {
  const data = {
    name,
    html,
  }

  const response = await axios.post(`${baseUrl}/send-email`, data)
  return response.data
}

