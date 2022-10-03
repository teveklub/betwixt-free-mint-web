const dev = {
    DEPLOYED_NTW_NAME: 'rinkeby',
    DEPLOYED_CHAIN_ID: 4,
    INFURA_ID: 'a5e79e6ee9a14236b385e47849805596',
    FORTMATIC_KEY: 'pk_test_DD2BBA8AAA1D4FED',
    RPC_URL: 'https://rinkeby.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc',
    ETHERSCAN_URL: 'https://rinkeby.etherscan.io/',
    OPENSEA_URL: 'https://testnets.opensea.io/',
    API_URL: 'https://god-panels-metadata-staging.herokuapp.com/api',
    PREVIEW_URL: 'https://ssp-server-v2.herokuapp.com/api/project-session',
    AWS_URL:
      'https://galaxis-backend-staging.s3.eu-central-1.amazonaws.com/media',
  
    AGGREGATOR_URL: 'https://nft-aggregator-rinkeby.herokuapp.com/token',
    
    CROSSMINT_CLIENT_ID: '7de2bbab-cec3-456b-a2e1-96bbd99cb8ad',
    CROSSMINT_ENV: 'staging',

    TOKEN_CONTRACT: '0xd420bae071fd52256b149891b305c31ade857e8e'
  };
  
  const prod = {
    DEPLOYED_NTW_NAME: 'mainnet',
    DEPLOYED_CHAIN_ID: 1,
    INFURA_ID: 'a5e79e6ee9a14236b385e47849805596',
    FORTMATIC_KEY: 'pk_live_FBFF1F05F2879F29',
    RPC_URL: 'https://mainnet.infura.io/v3/0a0bbd3ce4ea4be5ad706514cf2cd8cc',
    ETHERSCAN_URL: 'https://etherscan.io/',
    OPENSEA_URL: 'https://opensea.io/',
  
    // API_URL: 'https://galaxis-backend.herokuapp.com',
    PREVIEW_URL: 'https://launchpad-backend.herokuapp.com/api/project-session',
    AWS_URL: 'https://galaxis-web.s3.amazonaws.com/media',
  
    AGGREGATOR_URL: 'https://nft-aggregator.herokuapp.com/token',
  
    EC_TOKEN_ADDRESS: '0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8',
    PHOENIX_CONTRACT_ADDRESS: '0x55B3154Ad761405B0cdd27355943Eb808d40b5A1',

    CROSSMINT_CLIENT_ID: 'b3f5189b-66fe-43d7-8295-c73f9fa3e3ef',
    CROSSMINT_ENV: ''
  
  };
  
  const common = {
    OPENSEA_COLLECTION: 'https://api.opensea.io/api/v1/collection',
  };
  
  // if use npm/yarn start,  NODE_ENV = "development"
  // if use npm/yarn build,  NODE_ENV = "production"
  let envConfig = dev; // process.env.NODE_ENV === "development" ? dev : prod
  let config = { ...envConfig, ...common };
  
  export default config;
  