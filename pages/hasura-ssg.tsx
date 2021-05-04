import { VFC } from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { initializeApollo } from '../lib/apolloClient'
import { GetUsersQuery, Users } from '../types/generated/graphql'
import { GET_USERS } from '../queries'
import { Layout } from '../components/Layout'

type HasraSSGPageProps = {
  users: ({
    __typename: string
  } & Pick<Users, 'id' | 'name' | 'created_at'>)[]
}

const HasraSSGPage: VFC<HasraSSGPageProps> = ({ users }) => {
  return (
    <Layout title="Hasura SSG">
      <p className="mb-3 font-bold">SSG+ISR</p>
      {users?.map((user) => {
        return (
          <Link key={user.id} href={`/users/${user.id}`}>
            <a className="my-1 cursor-pointer" data-testid={`link-${user.id}`}>
              {user.name}
            </a>
          </Link>
        )
      })}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo()
  const { data } = await apolloClient.query<GetUsersQuery>({
    query: GET_USERS,
  })

  return {
    props: { users: data.users },
    revalidate: 1,
  }
}

export default HasraSSGPage