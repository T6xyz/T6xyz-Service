import {
    CfnOutput,
    Stack,
    StackProps,
} from 'aws-cdk-lib';
import { 
    Instance, 
    InstanceClass, 
    InstanceSize, 
    InstanceType, 
    KeyPair, 
    KeyPairFormat, 
    KeyPairType, 
    MachineImage, 
    Peer, 
    Port, 
    SecurityGroup, 
    UserData, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export interface EC2StackProps extends StackProps {

}

export class EC2Stack extends Stack {
    constructor(scope: Construct, id: string, props?: EC2StackProps) {
        super(scope, id, props)

        const vpc = new Vpc(this, 'T6xyz-Backend-Service-VPC', {
            maxAzs: 2
        })

        const securityGroup = new SecurityGroup(this, 'T6xyz-Backend-Service-SecurityGroup', {
            vpc,
            allowAllOutbound: true
        })

        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(22), 'Allow SSH');
        securityGroup.addIngressRule(Peer.anyIpv4(), Port.tcp(8080), 'Allow for HTTP requests from Spring service');

        const userData = UserData.forLinux()
        userData.addCommands(
            'sudo yum update -y',
            'sudo yum install -y java-17-amazon-corretto',
            'mkdir /app',
            'cd /app',
            '# JAR will be copied via GitHub Actions',
            'echo "Ready for deployment"'
        )

        const instance = new Instance(this, 'T6xyz-Backend-Service', {
            vpc: vpc,
            instanceType: InstanceType.of(InstanceClass.T3, InstanceSize.MICRO),
            machineImage: MachineImage.latestAmazonLinux2023(),
            userData: userData,
            keyPair: new KeyPair(this, 'T6xyz-Backend-Service-KeyPair', {
                type: KeyPairType.RSA,
                format: KeyPairFormat.PEM
            })
        })

        new CfnOutput(this, 'PublicIP', {
            value: instance.instancePublicIp
        })
    }
}