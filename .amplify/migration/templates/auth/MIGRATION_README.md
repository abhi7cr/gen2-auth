## Stack refactor steps for auth category
### STEP 1: CREATE AND EXECUTE CLOUDFORMATION STACK REFACTOR FOR auth CATEGORY
This step will move the Gen1 auth resources to Gen2 stack.

1.a) Create stack refactor
```
aws cloudformation create-stack-refactor  --stack-definitions StackName=amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D,TemplateBody@=file://.amplify/migration/templates/auth/step3-sourceTemplate.json  StackName=amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB,TemplateBody@=file://.amplify/migration/templates/auth/step3-destinationTemplate.json  --resource-mappings  '[{"Source":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"UserPool"},"Destination":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthUserPool4BA7F805"}},{"Source":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"UserPoolClientWeb"},"Destination":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthUserPoolAppClient2626C6F8"}},{"Source":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"IdentityPool"},"Destination":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthIdentityPool3FDE84CC"}},{"Source":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"IdentityPoolRoleMap"},"Destination":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthIdentityPoolRoleAttachment045F17C8"}}]'
```
 
```
export STACK_REFACTOR_ID=<<REFACTOR-ID-FROM-CREATE-STACK-REFACTOR_CALL>>
```
  
1.b) Describe stack refactor to check for creation status
```
 aws cloudformation describe-stack-refactor --stack-refactor-id $STACK_REFACTOR_ID
```
 
1.c) Execute stack refactor
```
 aws cloudformation execute-stack-refactor --stack-refactor-id $STACK_REFACTOR_ID
```
 
1.d) Describe stack refactor to check for execution status
```
 aws cloudformation describe-stack-refactor --stack-refactor-id $STACK_REFACTOR_ID
```

#### Rollback step for refactor:
```
 aws cloudformation create-stack-refactor  --stack-definitions StackName=amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D,TemplateBody@=file://.amplify/migration/templates/auth/step3-sourceTemplate-rollback.json  StackName=amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB,TemplateBody@=file://.amplify/migration/templates/auth/step3-destinationTemplate-rollback.json  --resource-mappings  '[{"Source":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthUserPool4BA7F805"},"Destination":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"UserPool"}},{"Source":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthUserPoolAppClient2626C6F8"},"Destination":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"UserPoolClientWeb"}},{"Source":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthIdentityPool3FDE84CC"},"Destination":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"IdentityPool"}},{"Source":{"StackName":"amplify-mygen2app-basicauthref-sandbox-0fd257e5eb-auth179371D7-O3KV3QANHWAB","LogicalResourceId":"amplifyAuthIdentityPoolRoleAttachment045F17C8"},"Destination":{"StackName":"amplify-testauthrefactorbasi-dev-6c83f-authtestauthrefactorbasi3a9e2c2f-OV0SKHOD1T2D","LogicalResourceId":"IdentityPoolRoleMap"}}]'
```

```
export STACK_REFACTOR_ID=<<REFACTOR-ID-FROM-CREATE-STACK-REFACTOR_CALL>>
```

Describe stack refactor to check for creation status
```
 aws cloudformation describe-stack-refactor --stack-refactor-id $STACK_REFACTOR_ID
```

Execute stack refactor
```
 aws cloudformation execute-stack-refactor --stack-refactor-id $STACK_REFACTOR_ID
```

Describe stack refactor to check for execution status
```
 aws cloudformation describe-stack-refactor --stack-refactor-id $STACK_REFACTOR_ID
```
 ### STEP 2: REDEPLOY GEN2 APPLICATION
This step will remove the hardcoded references from the template and replace them with resource references (where applicable).

2.a) Only applicable to Storage category: Uncomment the following line in `amplify/backend.ts` file to instruct CDK to use the gen1 S3 bucket
```
s3Bucket.bucketName = YOUR_GEN1_BUCKET_NAME;
```

2.b) Deploy sandbox using the below command or trigger a CI/CD build via hosting by committing this file to your Git repository
```
npx ampx sandbox
```
