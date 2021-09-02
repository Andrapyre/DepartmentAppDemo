docker compose down
docker compose up -d

aws dynamodb create-table \
    --table-name department-app-demo-local \
    --attribute-definitions AttributeName=departmentId,AttributeType=S \
    --key-schema AttributeName=departmentId,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST \
    --endpoint-url http://localhost:8000 \
    --profile local-ddb \
    --region eu-central-1 