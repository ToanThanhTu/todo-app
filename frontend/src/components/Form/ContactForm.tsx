import { SubmitHandler, useForm } from "react-hook-form"
import styles from "./Form.module.css"
import { ContactFormModel } from "@/types"
import { useSendEmail } from "@/hooks"
import { toast } from "sonner"
import DataUsageIcon from "@mui/icons-material/DataUsage"

export default function ContactForm() {
  const { loading, sendEmail } = useSendEmail()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormModel>()

  const onSubmit: SubmitHandler<ContactFormModel> = async (values: ContactFormModel) => {
    const errorMessage = await sendEmail(values)

    if (errorMessage) {
      toast.error(`${errorMessage} :(`, {
        description: "Please try again later or contact me through other means.",
        closeButton: true,
      })
      return
    }

    toast.success("Message sent!", {
      description: `Thanks ${values.name} for contacting me! I'll get back to you soon.`,
      closeButton: true,
    })

    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.inputContainer}>
        <label htmlFor="name" className={styles.inputLabel}>
          Name:
        </label>
        <input
          id="name"
          placeholder="John Doe"
          {...register("name", { required: true, minLength: 2 })}
        />
        {errors.name?.type === "required" && <span className={styles.error}>Name is required</span>}
        {errors.name?.type === "minLength" && (
          <span className={styles.error}>Name must be at least 2 characters long</span>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="email" className={styles.inputLabel}>
          Email:
        </label>
        <input
          id="email"
          placeholder="john.doe@email.com"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <span className={styles.error}>Email is required</span>
        )}
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="message" className={styles.inputLabel}>
          Message:
        </label>
        <textarea
          id="message"
          placeholder="Ask me anything..."
          {...register("message", { required: true, minLength: 20 })}
        />
        {errors.message?.type === "required" && (
          <span className={styles.error}>Message is required</span>
        )}
        {errors.message?.type === "minLength" && (
          <span className={styles.error}>Message must be at least 20 characters long</span>
        )}
      </div>

      <button type="submit" disabled={loading} className={styles.btn}>
        {loading ? (
          <>
            <DataUsageIcon fontSize="small" style={{ animation: "spin 1s linear infinite" }} />{" "}
            Sending...
          </>
        ) : (
          "Send"
        )}
      </button>
    </form>
  )
}
