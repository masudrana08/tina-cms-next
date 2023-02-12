import React from 'react'
import { Post } from "../../components/posts/post";
import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from '../../components/layout';

export default function SinglePost(props: AsyncReturnType<typeof getStaticProps>["props"]) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  
  
  return (
    <Layout rawData={data} data={data.global as any}>
    <div>
      <h4>Name: {data.test.name}</h4>
      <h4>Roll: {data.test.roll}</h4>
      <h4>Age: {data.test.age}</h4>
    </div>
  </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.testPostQuery({
    relativePath: `${params.filename}.mdx`,
  });
  return {
    props: {
      ...tinaProps,
    },
  };
};

export const getStaticPaths = async () => {
  const testsListData = await client.queries.testConnection();
  return {
    paths: testsListData.data.testConnection.edges.map((t) => ({
      params: { filename: t.node._sys.filename },
    })),
    fallback: "blocking",
  };
};
export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
