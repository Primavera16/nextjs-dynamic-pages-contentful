import { ParsedUrlQuery } from 'querystring'

import { getPages, getPage } from '../../queries/page'

export default async function Page({ params }: { params: Params }) {
  const { data } = await getData(params)

  return (
    <>
      <div>Name:{data.name}</div>
      <div>Title:{data.title}</div>
      <div>Slug:{data.slug}</div>
    </>
  )
}

export async function generateStaticParams() {
  const data = await getPages()
  const paths = data.pageCollection.items.map((path) => ({
    slug: path.slug,
  }))
  return [paths]
}

type Params = {
  slug: string
} & ParsedUrlQuery

// This function can be named anything
const getData = async (params: Params) => {
  const slug = params?.slug as string

  const data = await getPage(slug)
  const page = data.pageCollection.items[0]

  if (!page) {
    throw new Error(`No page found with slug "${slug}"`)
  }

  return {
    data: { ...page },
  }
}
