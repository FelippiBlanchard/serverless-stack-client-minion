const config = {
    s3: {
      REGION: "us-east-1",
      BUCKET: "notes-api-prod-serverlessdeploymentbucket-1w4m79mz397ad",
    },
    apiGateway: {
      REGION: "us-east-1",
      URL: "https://8ri96ppdtj.execute-api.us-east-1.amazonaws.com/prod",
    },
    cognito: {
      REGION: "us-east-1",
      USER_POOL_ID: "us-east-1_YjhWBaGyO",
      APP_CLIENT_ID: "48j1uenordaib887ffht0k08ba",
      IDENTITY_POOL_ID: "us-east-1:e70a0030-58e5-40ae-814c-2fadabdb12b7",
    },
  };
  
  export default config;