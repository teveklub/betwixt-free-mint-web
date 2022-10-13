const dev = {
    DEPLOYED_NTW_NAME: 'goerli',
    DEPLOYED_CHAIN_ID: 5,
    INFURA_ID: 'cae2aed2f50a4087af91b000cf05be4c',
    FORTMATIC_KEY: 'pk_test_DD2BBA8AAA1D4FED',
    RPC_URL: 'https://goerli.infura.io/v3/cae2aed2f50a4087af91b000cf05be4c',
    ETHERSCAN_URL: 'https://goerli.etherscan.io/',
    OPENSEA_URL: 'https://testnets.opensea.io/',
    API_URL: 'https://god-panels-metadata-staging.herokuapp.com/api',
    PREVIEW_URL: 'https://ssp-server-v2.herokuapp.com/api/project-session',
    AWS_URL:
      'https://galaxis-backend-staging.s3.eu-central-1.amazonaws.com/media',
  
    AGGREGATOR_URL: 'https://nft-aggregator-rinkeby.herokuapp.com/token',
    
    CROSSMINT_CLIENT_ID: '7de2bbab-cec3-456b-a2e1-96bbd99cb8ad',
    CROSSMINT_ENV: 'staging',
    SALE_CONTRACT: '0xA2c765F97b76c339CD551FB32621b319A430e8f8',
    TOKEN_CONTRACT: '0xc371de84f23e87804e9bdfc89f1f3dab146add0f'
  };
  
  const prod = {
    DEPLOYED_NTW_NAME: 'mainnet',
    DEPLOYED_CHAIN_ID: 1,
    INFURA_ID: 'a5e79e6ee9a14236b385e47849805596',
    FORTMATIC_KEY: 'pk_live_FBFF1F05F2879F29',
    RPC_URL: 'https://morning-dawn-night.quiknode.pro/11200b9a0f021eb0e380b0f273424505379b271d/',
    ETHERSCAN_URL: 'https://etherscan.io/',
    OPENSEA_URL: 'https://opensea.io/',
  
    // API_URL: 'https://galaxis-backend.herokuapp.com',
    PREVIEW_URL: 'https://launchpad-backend.herokuapp.com/api/project-session',
    AWS_URL: 'https://galaxis-web.s3.amazonaws.com/media',
  
    AGGREGATOR_URL: 'https://nft-aggregator.herokuapp.com/token',
  
    EC_TOKEN_ADDRESS: '0x97ca7fe0b0288f5eb85f386fed876618fb9b8ab8',
    PHOENIX_CONTRACT_ADDRESS: '0x55B3154Ad761405B0cdd27355943Eb808d40b5A1',

    CROSSMINT_CLIENT_ID: 'b3f5189b-66fe-43d7-8295-c73f9fa3e3ef',
    CROSSMINT_ENV: '',
    SALE_CONTRACT: '0x730d2d827FE32073b8ca5bdA74a921E4492EeFEB',
    TOKEN_CONTRACT: '0x2a3Bc72ed71DB2a27Cfe2Ba50aEcC692Fb04FcfF'
  
  };
  
  const common = {
    OPENSEA_COLLECTION: 'https://api.opensea.io/api/v1/collection',
  };
  
  // if use npm/yarn start,  NODE_ENV = "development"
  // if use npm/yarn build,  NODE_ENV = "production"
  let envConfig = prod; // process.env.NODE_ENV === "development" ? dev : prod
  let config = { ...envConfig, ...common };
  
  export default config;
  