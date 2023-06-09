import {client} from "../libs/client"
import Head from 'next/head'
import Link from "next/link";

export const getStaticProps = async () => {
  // const data = await client.get({endpoint:"blog"});
  const tag = await client.get({ endpoint: "tag" });
  return {
    props:{
      tags: tag.contents,
    }
  }
}

export default function Tag({tags}) {
  return (
<>

{/* <div class="container px-6 py-8 mx-auto flex items-center flex-col"> */}
<div class="container px-6 py-8 mx-auto">
<Head>
        <title>phihash blog</title>
        <meta name="description" content="phihash blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
</Head>
<section class="text-gray-600 body-font">
  <div class="container px-5 py-24 mx-auto">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="sm:text-4xl text-3xl font-semibold title-font text-gray-900">Link</h1>
    </div>
    <div class="flex flex-wrap -m-2">
    {tags.map((tag) => {
      return (
      <div class="p-2 lg:w-1/3 md:w-1/2 w-full">
        <Link href={`tag/${tag.id}`} legacyBehavior>
        <div class="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <div class="flex-grow ml-4">
            <h2 class="text-gray-900 title-font font-bold">{tag.tag}</h2>
          </div>
        </div>
        </Link>
      </div>
      )
    })}
    </div>
  </div>
</section>
</div>
</>
  );
}
