import {
    Stack,
    StackProps,
} from 'aws-cdk-lib';
import { Certificate, CertificateValidation } from 'aws-cdk-lib/aws-certificatemanager';
import { 
    Instance, 
    InstanceClass, 
    InstanceSize, 
    InstanceType, 
    KeyPair, 
    MachineImage, 
    Peer, 
    Port, 
    SecurityGroup, 
    SubnetType, 
    UserData, Vpc } from 'aws-cdk-lib/aws-ec2';
import { ApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { InstanceTarget } from 'aws-cdk-lib/aws-elasticloadbalancingv2-targets';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { LoadBalancerTarget } from 'aws-cdk-lib/aws-route53-targets';
import { Construct } from 'constructs';

export interface EC2StackProps extends StackProps {
    /**
     * @param domainName
     * 
     * The domain name for the backend service
     */
    domainName: string,

    /**
     * @param subDomain
     * 
     * The subdomain for the backend service
     */
    subDomain: string
    /**
     * @param serviceName
     * 
     * The name of the service
     */
    serviceName: string
}

export class EC2Stack extends Stack {
    constructor(scope: Construct, id: string, props: EC2StackProps) {
        super(scope, id, props)

        const vpc = new Vpc(this, 'T6xyz-Backend-Service-VPC', {
            maxAzs: 2,
            subnetConfiguration: [
                {
                  cidrMask: 24,
                  name: 'PublicSubnet',
                  subnetType: SubnetType.PUBLIC,
                },
                {
                  cidrMask: 24,
                  name: 'PrivateSubnet',
                  subnetType: SubnetType.PRIVATE_WITH_EGRESS,
                }
              ],
        });

        const hostedZone = HostedZone.fromLookup(this, `${props.serviceName}-HostedZone`, {
            domainName: props.domainName
        });

        const certificate = new Certificate(this, `${props.serviceName}-Cert`, {
            domainName: props.domainName,
            subjectAlternativeNames: ['api.t6xyz.dev'],
            validation: CertificateValidation.fromDns(hostedZone)
        })

        const securityGroup = new SecurityGroup(this, `${props.serviceName}-SecurityGroup`, {
            vpc: vpc,
            allowAllOutbound: true
        })

        const loadBalanacerSecurityGroup = new SecurityGroup(this, 'Load-Balancer-SecurityGroup', {
            vpc: vpc,
            allowAllOutbound: true
        })

        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), 'Allow SSH');
        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(8080), 'Allow for HTTP requests from Spring service');
        loadBalanacerSecurityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(433), 'Allows for HTTP access');

        const userData = UserData.forLinux();
        userData.addCommands(
            'sudo yum update -y',
            'sudo yum install -y java-17-amazon-corretto',
            'mkdir /app',
            'cd /app',
            '# JAR will be copied via GitHub Actions',
            'echo "Ready for deployment"'
        );

        const instance = new Instance(this, `${props.serviceName}-Instance`, {
            vpc: vpc,
            instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
            machineImage: MachineImage.latestAmazonLinux2023(),
            userData: userData,
            vpcSubnets: { subnetType: SubnetType.PUBLIC },
            keyPair: KeyPair.fromKeyPairName(this, `${props.serviceName}-KeyPair`, "T6xyz-Backend-Service-KeyPair"),
            securityGroup: securityGroup,
            associatePublicIpAddress: true
        });

        const loadBalancer = new ApplicationLoadBalancer(this, `${props.serviceName}-LoadBalancer`, {
            vpc: vpc,
            internetFacing: true,
            securityGroup: loadBalanacerSecurityGroup
        });

        const listener = loadBalancer.addListener('HTTP-Listener', {
            port: 443,
            certificates: [certificate],
            open: true
        });

        listener.addTargets('Backend-Fleet', {
            port: 8080,
            targets: [new InstanceTarget(instance)],
            healthCheck: {
                path: '/',
                port: '8080',
            },
        });

        new ARecord(this, 'Backend-Record', {
            zone: hostedZone,
            recordName: props.subDomain,
            target: RecordTarget.fromAlias(new LoadBalancerTarget(loadBalancer))
        });
    }
}