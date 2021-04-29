module.exports = {
  client: {
    service: {
      name: 'study-hasura-nextjs',
      url: 'https://basic-lesson-ao.hasura.app/v1/graphql',
    },
    includes: ['./queries/**/*.ts'],
    excludes: ['**/__tests__/**'],
  },
}
