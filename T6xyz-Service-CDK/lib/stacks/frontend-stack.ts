import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { Construct } from "constructs";
import { Certificate, CertificateValidation } from "aws-cdk-lib/aws-certificatemanager";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Distribution, ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";

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

        const hostedZone = new HostedZone(this, `${props.serviceName}-HostedZone`, {
            zoneName: props.domainName
        })

        const certificate = new Certificate(this, `${props.serviceName}-Cert`, {
            domainName: props.domainName,
            validation: CertificateValidation.fromDns(hostedZone)
        })

        const bucket = new Bucket(this, `${props.serviceName}-Bucket`, {
            bucketName: `${props.serviceName}-bucket`,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.DESTROY,
            autoDeleteObjects: true
        })

        const distribution = new Distribution(this, `${props.serviceName}-SiteDistribution`, {
            defaultRootObject: 'index.html',
            domainNames: [props.domainName],
            certificate,
            defaultBehavior: {
              origin: new S3StaticWebsiteOrigin(bucket),
              viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            },
          });

          new ARecord(this, 'Frontend-Record', {
            zone: hostedZone,
            target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
        });
    }
}