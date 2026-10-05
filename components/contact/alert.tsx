import { CircleAlert } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ContactState } from '@/lib/contact/schema'
import type { Contact } from '@/lib/content/contact'

type ContactAlertProps = {
  status: ContactState['status']
  form: Contact['form']
  email: string
}

function getMessage({ status, form, email }: ContactAlertProps) {
  if (status === 'limited') {
    return form.limited
  }

  return (
    <>
      {form.error} <a href={`mailto:${email}`}>{email}</a>.
    </>
  )
}

export function ContactAlert(props: ContactAlertProps) {
  const hasProblem = props.status === 'error' || props.status === 'limited'

  return (
    <div role="status" aria-live="polite">
      {hasProblem ? (
        <Alert role={undefined} variant="destructive">
          <CircleAlert />
          <AlertDescription>
            <p>{getMessage(props)}</p>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  )
}
