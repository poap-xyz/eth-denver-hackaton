import { gql, GraphQLClient } from 'graphql-request';

const API_URL_L1 = 'https://api.thegraph.com/subgraphs/name/poap-xyz/poap';
const API_URL_L2 = 'https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai';

// TODO: Create an interface

export class Subgraph {
  private subgraph = null;

  constructor(url: string) {
    this.subgraph = new GraphQLClient(url);
  }

  public async hasAddress(address: string, eventId: string): Promise<boolean> {
    const tokensQuery = gql`
    query {
      tokens(where: {owner: "${address.toLowerCase()}", event: "${eventId}"}) {
        id
      }
    }`;

    const res = await this.subgraph.request(tokensQuery);
    return res && res.tokens && res.tokens.length > 0;
  }
}

export class TheGraphBlockchainQuery {
  public async hasAddress(address: string, eventId: string): Promise<boolean> {
    const subgraph_1 = new Subgraph(API_URL_L1);
    const subgraph_2 = new Subgraph(API_URL_L2);

    return (
      (await subgraph_2.hasAddress(address, eventId)) ||
      (await subgraph_1.hasAddress(address, eventId))
    );
  }
}
