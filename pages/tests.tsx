import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { client } from "../.tina/__generated__/client";
import { Layout } from "../components/layout";

export default function TestPages(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const tests = props.data.testConnection.edges;

tests.map(i=>{
    console.log(i, 'test')
}) 

  return (
    <Layout>
      <Section className="flex-1">
        <Container size="large" width="small">
          {
            tests.map((test: any, key)=>(
                <div key={key}>
                        <a style={{color:'blue', fontSize:"25px"}}  href={"/tests/"+test.node._sys.filename}>{test.node._sys.filename}</a>
                </div>
            ))
          }
        </Container>
      </Section>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.testPageQuery();
  return {
    props: {
      ...tinaProps,
    },
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
