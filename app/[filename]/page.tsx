import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from "next/navigation";
import { PageComponent } from "../../components/page";
import { client } from "../../tina/__generated__/databaseClient";
import tina from '../../tina/__generated__/client'


type Props = {
  params: { filename: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function getPageData(filename: string) {
  try {
    const res = await client.queries.page({ relativePath: `${filename}.md` }) ?? null;
    if (!res?.data?.page) { notFound() }
    tina.queries.post
    const parsedResponse = JSON.parse(JSON.stringify(res))
    return parsedResponse
  } catch (e) {
    throw e 
  }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {

  try {
    const res = await getPageData(params.filename)

    return {
      title: res.data.page.title,
      description: res.data.page.description,
      // openGraph: {
      //   images: ["/some-specific-page-image.jpg", ...previousImages],
      // },
    };
  } catch (error) {
    console.log('generateMetadata error:', error)
    return {
      title: "Oops, we can't find this page",
      description: "The page you are looking for does not exist",
    };
  }
}

export default async function Page({ params, searchParams }: Props)  {
  const res = await getPageData(params.filename)
  console.log(res.data.page.backgroundImage)
  return (
      <PageComponent
        // https://github.com/vercel/next.js/issues/47447
        data={res.data}
        query={res.query}
        variables={res.variables}
      />
  );
}

