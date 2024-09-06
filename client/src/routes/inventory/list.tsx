import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory/list')({
  component: () => <div>Hello /inventory/list!</div>
})