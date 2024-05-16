import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inventory')({
  component: () => <div>Hello inventory!</div>
})