import { LayoutWrapper } from "../../../components/layout/LayoutWrapper";
import { ImageGallery } from "~/components/blocks/imageGallery";
import GalleryTiles from "./GalleryTiles";
import { client } from "../../../tina/__generated__/databaseClient";

async function getPhotoGalleryData() {
  try {
    const res = await client.queries.page({ relativePath: `photo-gallery.md` }) ?? null;
    if (!res?.data?.page) { notFound() }
    const parsedResponse = JSON.parse(JSON.stringify(res))
    return parsedResponse
  } catch (e) {
    throw e 
  }
}


export default async function Page({ params, searchParams })  {
  console.log(params)
  const res = await getPhotoGalleryData()
  return (
    <LayoutWrapper {...res}>
      <GalleryTiles
        data={res.data}
        query={res.query}
        variables={res.variables}
      />
      {/* <Blocks {...props} /> */}
    </LayoutWrapper>
  );
}

