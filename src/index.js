import 'cross-fetch/polyfill'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client/core';
import 'dotenv/config';

const GET_REPOSITORIES_OF_ORGANIZATION = gql`
	query($organization: String!){
		organization(login: $organization){
			name
			url
			repositories(first: 5){
				edges {
					node {
						id
						name
						url
						stargazers {
							totalCount
						}
					}
				}
				totalCount
				pageInfo {
					endCursor
					hasNextPage
				}
			}
		}
	}
`;

const client = new ApolloClient({
	uri: 'https://api.github.com/graphql',
	cache: new InMemoryCache(),
	headers: {
		authorization: `Bearer ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
	}
})

client.query({
	query: GET_REPOSITORIES_OF_ORGANIZATION,
	variables: {
		organization: "the-road-to-learn-react",
	}
}).then(console.log)