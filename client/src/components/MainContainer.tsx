import { PropsWithChildren } from 'react';
import { useMediaQuery } from "usehooks-ts";

type MainProps = PropsWithChildren;

export default function MainContainer({ children }: MainProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
        <main className='pt-10'>
          {children}
        </main>
    );
  }

  return (
    <main className='pt-14'>
      {children}
    </main>
  );

}