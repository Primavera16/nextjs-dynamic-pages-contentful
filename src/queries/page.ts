import { IPageFields } from '../../@types/generated/contentful'
import { executeQuery } from '../utils/apiClient'

export type GetPagesResponse = {
  pageCollection: {
    items: Pick<IPageFields, 'slug'>[]
  }
}

const getPagesQuery = `{
    pageCollection (preview: ${process.env.CONTENTFUL_PREVIEW}) {
        items {
          slug
        }
    }
}`

export const getPages = async (): Promise<GetPagesResponse> => {
  return await executeQuery<GetPagesResponse>(getPagesQuery)
}

export type GetPageResponse = {
  pageCollection: {
    items: IPageFields[]
  }
}

const getPageQuery = (slug: string) => `{
  pageCollection(preview: ${process.env.CONTENTFUL_PREVIEW}, where: { slug: "${slug}" }, limit:1) {
    items {
      name
      slug
      title
    }
  }     
}`

export const getPage = async (slug: string): Promise<GetPageResponse> => {
  const query = getPageQuery(slug)
  return await executeQuery<GetPageResponse>(query)
}
