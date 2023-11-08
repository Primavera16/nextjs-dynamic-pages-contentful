import { ParsedUrlQuery } from 'querystring'

import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { IPageFields } from '../../@types/generated/contentful'
import { getPages, getPage } from '../queries/page'

const Page: NextPage<IPageFields> = ({ name, title, slug }) => {
  return (
    <>
      <div>Name:{name}</div>
      <div>Title:{title}</div>
      <div>Slug:{slug}</div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getPages()
  const paths = data.pageCollection.items.map((path) => ({
    params: {
      slug: path.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

type Params = {
  slug: string
} & ParsedUrlQuery

export const getStaticProps: GetStaticProps<IPageFields, Params> = async ({
  params,
}) => {
  const slug = params?.slug as string
  const data = await getPage(slug)
  const page = data.pageCollection.items[0]

  if (!page) {
    throw new Error(`No page found with slug "${slug}"`)
  }

  return {
    props: { ...page },
  }
}

export default Page
