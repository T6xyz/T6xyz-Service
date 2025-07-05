import { App } from 'aws-cdk-lib';
import { EC2Stack } from './stacks/ec2-stack';
import { ACCOUNT_ID, BACKEND_DOMAIN, BACKEND_SERVICE_NAME, BACKEND_SUBDOMAIN, FRONTEND_DOMAIN, FRONTEND_SERVICE_NAME, REGION } from './config/constants';
import { FrontendStack } from './stacks/frontend-stack';

const app = new App();

const env = {
  account: ACCOUNT_ID,
  region: REGION
}

const ec2Stack = new EC2Stack(app, `${BACKEND_SERVICE_NAME}-EC2-Stack`, {
  domainName: BACKEND_DOMAIN,
  subDomain: BACKEND_SUBDOMAIN,
  serviceName: BACKEND_SERVICE_NAME,
  env: env,
});

const frontendStack = new FrontendStack(app, `${FRONTEND_SERVICE_NAME}-Frontend-Stack`, {
  domainName: FRONTEND_DOMAIN,
  serviceName: FRONTEND_SERVICE_NAME,
  env: env
})
