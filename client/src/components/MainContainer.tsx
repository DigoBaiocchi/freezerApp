import { PropsWithChildren } from 'react';

type MainProps = PropsWithChildren;

export default function MainContainer({ children }: MainProps) {
    return (
        <main className='pt-14'>
          {children}
        </main>
    );
}