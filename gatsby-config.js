module.exports = {
  siteMetadata: {
    title: 'Resume builder',
    description: 'Build your resume easily!',
    author: 'Resume Builder',
  },
  pathPrefix: '/resume-builder',
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-typescript-checker',
      options: {
        tsconfig: 'tsconfig.json',
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-offline',
  ],
};
