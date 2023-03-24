import { client } from "../../libs/client";
import dayjs from 'dayjs';
import Link from "next/link";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = await client.get({endpoint:"blog",contentId:id});

  return {
    props:{
      blog:data
    }
  }
}

export const getStaticPaths = async () => {
  const data = await client.get({endpoint:"blog"});
  const paths = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths,
    fallback: false
  }
}

export default function BlogId({blog}){
  return (
      <>
        <main class="container px-10 py-8 mx-auto">
          <h1 class="title-font text-xl font-bold mb-6">{blog.title}</h1>
          <p class="font-semibold text-sm">
            <span class="mr-2">公開日 {dayjs.utc(blog.publishedAt).tz('Asia/Tokyo').format('YY/MM/DD hh:mm')}</span>
            修正日 {dayjs.utc(blog.revisedAt).tz('Asia/Tokyo').format('YY/MM/DD hh:mm')}
          </p>
          <div class="my-8 font-semibold" dangerouslySetInnerHTML={{__html:`${blog.body}`}}>
          </div>

          <Link legacyBehavior href="/" class="block">
            <a class="block mx-auto py-3 text-xl text-center font-bold bg-gray-200 w-1/4 sm:w-1/6  hover:text-cyan-600 text-cyan-900 rounded">Back</a>
          </Link>

        </main>
      </>
  )
}
