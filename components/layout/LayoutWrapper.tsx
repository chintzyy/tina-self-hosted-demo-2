import Headline from '~/components/layout/Headline';
import Backdrop from '~/components/layout/Backdrop';
import { Header } from "~/components/layout/header";

export function LayoutWrapper(props: {
}) {
  const isNotHome = (props.data.page._sys.filename !== 'index')
  return (
    <>
      <Backdrop image={props.data?.page?.backgroundImage} />
      <Header />
      { isNotHome ? <Headline {...props} /> : null }
      <main className="flex flex-col items-center justify-between px-24">
        <div className={`z-10 w-full items-center justify-between font-mono text-sm ${isNotHome ? 'max-w-5xl' : ''} `}>
          {props.children}
        </div>
      </main>
    </>
  );
}

