import { createFileRoute } from '@tanstack/react-router'

type ProductSearch = {
  categoryId: string
}

export const Route = createFileRoute('/freezer/$freezerId')({
  validateSearch: (search: Record<string,unknown>): ProductSearch  => {
    return {
      categoryId: search.categoryId as string,
    }
  },
  component: () => {
    const { freezerId } = Route.useParams();
    const { categoryId } = Route.useSearch();

    console.log({categoryId})

    return <div className='pt-10'>{`Hello /freezer/${freezerId}/${categoryId}!`}</div>
  }
})