import { jsonLdScript } from "../../constants/metadata";

/*
  Renders JSON-LD structured data into the server HTML.

  This is a SERVER component on purpose. Structured data has to be in the HTML
  the crawler receives; anything that only appears after hydration may never be
  seen. Rendering a plain <script type="application/ld+json"> from a server
  component guarantees it is in the first byte.

  Replaces the JSON-LD path of the old Shared/Head.tsx, which accepted a
  `jsonLd` prop and then never rendered it at all — the component returned null
  and only ever touched document.title.
*/
export default function JsonLd({ schema }: { schema: object | object[] }) {
  const blocks = jsonLdScript(schema);

  return (
    <>
      {blocks.map((json, i) => (
        <script
          key={i}
          type="application/ld+json"
          // The payload is escaped in jsonLdScript(); see the note there.
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </>
  );
}
