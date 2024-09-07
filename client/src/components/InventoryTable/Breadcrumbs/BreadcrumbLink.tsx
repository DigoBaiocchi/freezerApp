import { Link } from "@tanstack/react-router";
import { LinkProps } from "node_modules/@tanstack/react-router/dist/esm/link";

type LinkForBreadcrumbProps = {
    name: string;
} & LinkProps & React.RefAttributes<HTMLAnchorElement>

export function LinkForBreadcrumb({ name, ...props }: LinkForBreadcrumbProps) {
    return <Link {...props} className="underline"><b>{name}</b></Link>
}