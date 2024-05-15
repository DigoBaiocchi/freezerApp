import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

const Index = () => {
    return (
        <div>
            <h3>Welcome home!</h3>
        </div>
    );
}


export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category',
  component: Index,
});