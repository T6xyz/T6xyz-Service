import { Duration, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { AllowedMethods, Distribution, SecurityPolicyProtocol, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import path from "path";

export interface FrontendStackProps extends StackProps {
    /**
     * @param domainName
     * 
     * The domain name of the frontend application
     */
    domainName: string;
    /**
     * @param serviceName
     * 
     * The name of the service
     */
    serviceName: string;
}

export class FrontendStack extends Stack {
    constructor(scope: Construct, id: string, props: FrontendStackProps) {
        super(scope, id, props)

        const hostedZone = HostedZone.fromLookup(this, `${props.serviceName}-HostedZone`, {
            domainName: props.domainName
        })

        const certificate = new Certificate(this, `${props.serviceName}-Cert`, {
            domainName: props.domainName,
            validation: CertificateValidation.fromDns(hostedZone)
        })

        const siteBucket = new Bucket(this, 'SiteBucket', {
            bucketName: props.domainName,
            publicReadAccess: false,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.DESTROY, // Modify in prod
            autoDeleteObjects: true, // Modify in prod
          });

        const distribution = new Distribution(this, 'SiteDistribution', {
            certificate: certificate,
            defaultRootObject: "index.html",
            domainNames: [props.domainName],
            minimumProtocolVersion: SecurityPolicyProtocol.TLS_V1_2_2021,
            errorResponses:[
                {
                httpStatus: 403,
                responseHttpStatus: 403,
                responsePagePath: '/error.html',
                ttl: Duration.minutes(30),
                }
            ],
            defaultBehavior: {
                origin: S3BucketOrigin.withOriginAccessControl(siteBucket),
                compress: true,
                allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            }
        })

        new ARecord(this, 'Frontend-Record', {
            zone: hostedZone,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        });

        new BucketDeployment(this, 'DeployWithInvalidation', {
            sources: [Source.asset(path.join(__dirname, '../../../T6xyz-Service-Frontend/dist'))],
            destinationBucket: siteBucket,
            distribution,
            distributionPaths: ['/*'],
          });
    }
}