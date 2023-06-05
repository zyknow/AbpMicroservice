#!/bin/bash

# Check development certificates

if [ ! -f "./etc/dev-cert/localhost.pfx" ]; then
  echo "Creating dev certificates..."
  cd "./etc/dev-cert"
  ./create-certificate.sh
  cd "../.."
fi

# Check Docker containers

requiredServices=("postgres" "rabbitmq" "redis")

for requiredService in "${requiredServices[@]}"; do
  nameParam="name=$requiredService"
  serviceRunningStatus=$(docker ps --filter $nameParam)
  isDockerImageUp=$(echo $serviceRunningStatus | grep $requiredService)

  if [ -n "$isDockerImageUp" ]; then
    echo "$requiredService [up]"
  else
    cd "./etc/docker/"
    docker network create abpmicroservice-network
    docker-compose -f dev_docker-compose.yml up -d
    cd "../.."
    break
  fi
done

cd "./shared/AbpMicroservice.DbMigrator"
dotnet run
cd "../.."

# Run all services

tye run $@
