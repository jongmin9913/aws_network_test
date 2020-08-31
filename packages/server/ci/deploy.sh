
# Set Cluster
ecs-cli configure --region ap-northeast-2 --cluster jmlee-vpc1-subnet1-ecs1 --default-launch-type FARGATE

# Build Images
docker-compose -f ./packages/server/ci/docker-compose.yml build

# Push to ECR
eval "$( aws ecr get-login --no-include-email --region ap-northeast-2)"
ecs-cli push 345073223387.dkr.ecr.ap-northeast-2.amazonaws.com/jmlee-vpc

# # ECS Production용 Service 배포
ecs-cli compose --project-name jmlee-server \
		-f ./packages/server/ci/docker-compose.yml \
		--ecs-params ./packages/server/ci/ecs-params.yml \
		service up \
		--create-log-groups \
		--timeout 10 \
		--target-group-arn arn:aws:elasticloadbalancing:ap-northeast-2:345073223387:targetgroup/jmlee-vpc1-subnet1-alb1-t/8f8d4bbcddf4f4e9 \
		--container-port 80 \
		--container-name jmlee-vpn1-subnet1-alb1
