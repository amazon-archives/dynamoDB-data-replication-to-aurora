# ddbStreamsToAurora
Source code which enables Data Replication from DynamoDB to Amazon Aurora.This source code is to be used as a reference
for a AWS Blog post which shows you how you could implement data replication from dynamodb to Amazon Aurora. It is not production ready.

The cleanup_cli.txt file contains all the CLI commands to cleanup resources which were created using CLI commands documented in the blog post.


The 'TestHarness' folder contains source code of a TestHarness which populates a DynamoDB Table with sample data.

The 'cfTemplates' folder contains source code for all the cloudformation templates used within the blog post.

The 'lambda_iam' folder contains IAM Policies and the source code (Zip files) for all the Lambda functions used in the blog post.