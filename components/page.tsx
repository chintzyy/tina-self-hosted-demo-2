import { PageQuery } from "../tina/__generated__/types";
import { Blocks } from "../components/blocks-renderer";
import { LayoutWrapper } from "./layout/LayoutWrapper";

export function PageComponent(props: {
  data: PageQuery;
  variables: object;
  query: string;
}) {
  return (
    <LayoutWrapper {...props}>
      <Blocks {...props} />
    </LayoutWrapper>
  );
}
