FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# It's important to keep lines from here down to "COPY . ." identical in all Dockerfiles
# to take advantage of Docker's build cache, to speed up local container builds
COPY "AbpMicroservice.sln" "AbpMicroservice.sln"

# Applications
COPY "apps/auth-server/src/AbpMicroservice.AuthServer/AbpMicroservice.AuthServer.csproj" "apps/auth-server/src/AbpMicroservice.AuthServer/AbpMicroservice.AuthServer.csproj"

# Shared Projects
COPY "shared/AbpMicroservice.DbMigrator/AbpMicroservice.DbMigrator.csproj" "shared/AbpMicroservice.DbMigrator/AbpMicroservice.DbMigrator.csproj"
COPY "shared/AbpMicroservice.Shared.Hosting/AbpMicroservice.Shared.Hosting.csproj" "shared/AbpMicroservice.Shared.Hosting/AbpMicroservice.Shared.Hosting.csproj"
COPY "shared/AbpMicroservice.Shared.Hosting.Gateways/AbpMicroservice.Shared.Hosting.Gateways.csproj" "shared/AbpMicroservice.Shared.Hosting.Gateways/AbpMicroservice.Shared.Hosting.Gateways.csproj"
COPY "shared/AbpMicroservice.Shared.Hosting.Microservices/AbpMicroservice.Shared.Hosting.Microservices.csproj" "shared/AbpMicroservice.Shared.Hosting.Microservices/AbpMicroservice.Shared.Hosting.Microservices.csproj"
COPY "shared/AbpMicroservice.Shared.Hosting.AspNetCore/AbpMicroservice.Shared.Hosting.AspNetCore.csproj" "shared/AbpMicroservice.Shared.Hosting.AspNetCore/AbpMicroservice.Shared.Hosting.AspNetCore.csproj"
COPY "shared/AbpMicroservice.Shared.Hosting/AbpMicroservice.Shared.Hosting.csproj" "shared/AbpMicroservice.Shared.Hosting/AbpMicroservice.Shared.Hosting.csproj"
COPY "shared/AbpMicroservice.Shared.Localization/AbpMicroservice.Shared.Localization.csproj" "shared/AbpMicroservice.Shared.Localization/AbpMicroservice.Shared.Localization.csproj"

# Microservices
COPY "services/administration/src/AbpMicroservice.AdministrationService.HttpApi.Host/AbpMicroservice.AdministrationService.HttpApi.Host.csproj" "services/administration/src/AbpMicroservice.AdministrationService.HttpApi.Host/AbpMicroservice.AdministrationService.HttpApi.Host.csproj"
COPY "services/identity/src/AbpMicroservice.IdentityService.HttpApi.Host/AbpMicroservice.IdentityService.HttpApi.Host.csproj" "services/identity/src/AbpMicroservice.IdentityService.HttpApi.Host/AbpMicroservice.IdentityService.HttpApi.Host.csproj"
COPY "services/saas/src/AbpMicroservice.SaasService.HttpApi.Host/AbpMicroservice.SaasService.HttpApi.Host.csproj" "services/saas/src/AbpMicroservice.SaasService.HttpApi.Host/AbpMicroservice.SaasService.HttpApi.Host.csproj"
# Gateways
COPY "gateways/web/src/AbpMicroservice.WebGateway/AbpMicroservice.WebGateway.csproj" "gateways/web/src/AbpMicroservice.WebGateway/AbpMicroservice.WebGateway.csproj"

COPY "NuGet.Config" "NuGet.Config"

RUN dotnet restore "AbpMicroservice.sln"

COPY . .
WORKDIR "/src/services/saas/src/AbpMicroservice.SaasService.HttpApi.Host"
RUN dotnet publish -c Release -o /app
# Should be used after .net6 is out of preview for better performance
# RUN dotnet publish --no-restore -c Release -o /app

FROM build AS publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "AbpMicroservice.SaasService.HttpApi.Host.dll"]