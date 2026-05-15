import { CheckCircle2Icon, InfoIcon } from "lucide-react"

import {
  Alert as BaseAlert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const Alert = () => {
  return (
    <div className="grid w-full max-w-md items-start gap-4">
      <BaseAlert>
        <CheckCircle2Icon />
        <AlertTitle>Payment successful</AlertTitle>
        <AlertDescription>
          Your payment of $29.99 has been processed. A receipt has been sent to
          your email address.
        </AlertDescription>
      </BaseAlert>
      <BaseAlert>
        <InfoIcon />
        <AlertTitle>New feature available</AlertTitle>
        <AlertDescription>
          We&apos;ve added dark mode support. You can enable it in your account
          settings.
        </AlertDescription>
      </BaseAlert>
    </div>
  )
}

export default Alert


