"use server"

import { Resend } from "resend"

interface FormState {
  message: string
  success: boolean
}

export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Basic validation
  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required." }
  }

  // Simulate a delay for demonstration purposes
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // --- Ensure the API key is present ---------------------------------
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("❌  RESEND_API_KEY is missing – set it in .env.local or Vercel project settings")
    return {
      success: false,
      message: "Email service is not configured. Please try again later.",
    }
  }

  // Initialise Resend only when we know the key exists
  const resend = new Resend(apiKey)

  try {
    console.log("--- Attempting Contact Form Submission ---")
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Subject: ${subject}`)
    console.log(`Message: ${message}`)

    await resend.emails.send({
      from: "onboarding@resend.dev", // Replace with your verified sender email (e.g., from Resend)
      to: "usmfrq804@gmail.com", // Replace with the email address where you want to receive messages
      subject: `Portfolio Contact: ${subject}`,
      html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
    })

    console.log("--- Email sent successfully! ---")
    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error: any) {
    console.error("Error sending message:", error)
    let errorMessage = "Failed to send message. Please try again later."
    if (error instanceof Error) {
      errorMessage = error.message // Use the error message from the exception
    } else if (typeof error === "object" && error !== null && "message" in error) {
      errorMessage = (error as any).message
    }
    return { success: false, message: errorMessage }
  }
}
