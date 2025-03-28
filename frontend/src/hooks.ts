import type { AppDispatch, AppStore, RootState } from "@/store"
import { useDispatch, useSelector, useStore } from "react-redux"
import { createElement, useState } from "react"
import { ContactFormModel } from "@/types"
import { sendContactEmail } from "@/services/email"
import Email from "@/components/Email/Email"
import { renderToStaticMarkup } from "react-dom/server"

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export function useSendEmail() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function sendEmail(values: ContactFormModel) {
    try {
      setLoading(true)
      setError(null)

      const styles = `main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          width: 100%;
          padding: 32px;
          background-color: #ffedd5;
        }

        section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          background-color: #fff7ed;
          padding: 32px;
          border-radius: 28px;
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 600;
          color: hsl(240 10% 3.9%);
        }

        btn {
          background-color: #c2410c;
          color: #fff7ed;
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
        }

        btn:hover {
          cursor: pointer;
          background-color: #fff7ed;
          color: #c2410c;
          outline: 1px solid #c2410c;
        }
      `

      const styleMarkup = renderToStaticMarkup(createElement("style", {}, styles))
      const markup = renderToStaticMarkup(createElement(Email, values))

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
              <meta charset="UTF-8">
              ${styleMarkup}
          </head>
          <body>
              <div>${markup}</div>
          </body>
        </html>
      `

      console.log("HTML:", html)

      const sendContactEmailResponse = await sendContactEmail(values.name, html)

      console.log("sendContactEmail response:", sendContactEmailResponse)

      if (sendContactEmailResponse.error) {
        setError(sendContactEmailResponse.error || "Failed to send email")
        setLoading(false)
        return sendContactEmailResponse.error || "Failed to send email"
      }

      setSuccess(true)
      setLoading(false)
      return null
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong. Please try again later."
      setError(errorMessage)
      setLoading(false)
      return errorMessage
    }
  }

  return { loading, error, success, sendEmail }
}
