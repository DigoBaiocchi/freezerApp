import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category')({
  component: () => <div>Hello category!</div>
})