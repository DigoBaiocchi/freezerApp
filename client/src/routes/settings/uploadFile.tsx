import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/settings/uploadFile')({
  component: () => <div>Hello /settings/uploadFile!</div>
})