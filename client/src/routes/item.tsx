import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/item')({
  component: () => <div>Hello items!</div>
})