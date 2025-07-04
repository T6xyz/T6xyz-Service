import * as cdk from 'aws-cdk-lib';
import { EC2Stack } from './stacks/ec2-stack';
import { ACCOUNT_ID, BACKEND_DOMAIN, BACKEND_SERVICE_NAME, BACKEND_SUBDOMAIN, REGION } from './config/constants';

const app = new cdk.App();

const env = {
  account: ACCOUNT_ID,
  region: REGION
}

const ec2Stack = new EC2Stack(app, `${BACKEND_SERVICE_NAME}-EC2-Stack`, {
  domainName: BACKEND_DOMAIN,
  subDomain: BACKEND_SUBDOMAIN,
  env: env,
});
