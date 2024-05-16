import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unit')({
  component: () => <div>Hello units!</div>
})