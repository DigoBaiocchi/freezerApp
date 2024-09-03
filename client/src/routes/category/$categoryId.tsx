import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/category/$categoryId')({
  component: () => <div>Hello /category/$categoryId!</div>
})