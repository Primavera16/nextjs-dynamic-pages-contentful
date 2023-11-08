// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export interface IPageFields {
  /** Name */
  name: string

  /** Title */
  title: string

  /** Slug */
  slug: string
}

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'page'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export interface IPostFields {
  /** title */
  title: string

  /** slug */
  slug: string

  /** description */
  description?: string | undefined
}

export interface IPost extends Entry<IPostFields> {
  sys: {
    id: string
    type: string
    createdAt: string
    updatedAt: string
    locale: string
    contentType: {
      sys: {
        id: 'post'
        linkType: 'ContentType'
        type: 'Link'
      }
    }
  }
}

export type CONTENT_TYPE = 'page' | 'post'

export type LOCALE_CODE = 'en-US'

export type CONTENTFUL_DEFAULT_LOCALE_CODE = 'en-US'