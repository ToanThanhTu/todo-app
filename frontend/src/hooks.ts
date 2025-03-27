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

      const contactEmailHtml = renderToStaticMarkup(createElement(Email, values))

      const sendContactEmailResponse = await sendContactEmail(values.name, contactEmailHtml)

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
