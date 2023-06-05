<# Check development certificates #>

if (!(  Test-Path ".\etc\dev-cert\localhost.pfx" -PathType Leaf))
{
    Write-Information "Creating dev certificates..."
    cd ".\etc\dev-cert"
    .\create-certificate.ps1
    cd ../..
}

<# Check Docker containers #>

$requiredServices = @(
'postgres',
'rabbitmq',
'redis'
#'grafana',
#'prometheus',
#'kibana',
#'elasticsearch',
)

foreach ($requiredService in $requiredServices)
{

    $nameParam = -join ("name=", $requiredService)
    $serviceRunningStatus = docker ps --filter $nameParam
    $isDockerImageUp = $serviceRunningStatus -split " " -contains $requiredService

    if ($isDockerImageUp)
    {
        Write-Host ($requiredService + " [up]")
    }
    else
    {
        cd "./etc/docker/"
        docker network create abpmicroservice-network
        docker-compose -f dev_docker-compose.yml up -d
        cd ../..
        break;
    }
}

cd "./shared/AbpMicroservice.DbMigrator"
dotnet run
cd ../..


<# Run all services #>

tye run $args