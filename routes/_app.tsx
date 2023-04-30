import { Head } from 'aleph/react';
import { title } from '../config.ts';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children};
    </>
  );
}
