const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`

type QueryResponse<T> = {
  data?: T
  errors?: { message: string }[]
}

export const executeQuery = async <T>(query: string): Promise<T> => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${
        process.env.CONTENTFUL_PREVIEW
          ? process.env.CONTENTFUL_ACCESS_PREVIEW_TOKEN
          : process.env.CONTENTFUL_ACCESS_TOKEN
      }`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }

  const response = await fetch(CONTENTFUL_URL, fetchOptions)

  // data and errors come from the graphQL specs
  const { data, errors }: QueryResponse<T> = await response.json()

  if (response.ok) {
    if (!data) return Promise.reject("Succesful API call but 'data' is null")

    return data
  } else {
    // handle the graphql errors
    const error = new Error(
      errors?.map((e: { message: string }) => e.message).join('\n') ??
        'unknown error message'
    )
    return Promise.reject(error)
  }
}
