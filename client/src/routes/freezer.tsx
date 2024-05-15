import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';

const About = () => {
  return (
    <div className="p-2">Hello from About!</div>

  );
}


export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/freezer',
  component: About,
});