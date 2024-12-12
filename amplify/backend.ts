import { auth } from "./auth/resource";
import { defineBackend } from "@aws-amplify/backend";
import { RemovalPolicy } from 'aws-cdk-lib';
const backend = defineBackend({
    auth
});
const cfnUserPool = backend.auth.resources.cfnResources.cfnUserPool;
cfnUserPool.userPoolName = "testauthrefactorbasi3a9e2c2f_userpool_3a9e2c2f-dev";
cfnUserPool.usernameAttributes = undefined;
cfnUserPool.policies = {
    passwordPolicy: {
        minimumLength: 8,
        requireLowercase: false,
        requireNumbers: false,
        requireSymbols: false,
        requireUppercase: false,
        temporaryPasswordValidityDays: 7
    }
};
cfnUserPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
const cfnIdentityPool = backend.auth.resources.cfnResources.cfnIdentityPool;
cfnIdentityPool.identityPoolName = "testauthrefactorbasi3a9e2c2f_identitypool_3a9e2c2f__dev";
cfnIdentityPool.allowUnauthenticatedIdentities = false;
cfnIdentityPool.applyRemovalPolicy(RemovalPolicy.RETAIN, { applyToUpdateReplacePolicy: true })
