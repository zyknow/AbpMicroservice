#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["services/saas/NuGet.Config", "services/saas/"]
COPY ["services/administration/NuGet.Config", "services/administration/"]
COPY ["services/saas/host/MyProjectName.SaaS.HttpApi.Host/MyProjectName.SaaS.HttpApi.Host.csproj", "services/saas/host/MyProjectName.SaaS.HttpApi.Host/"]
COPY ["shared/MyProjectName.Hosting.Shared/MyProjectName.Hosting.Shared.csproj", "shared/MyProjectName.Hosting.Shared/"]
COPY ["services/administration/src/MyProjectName.Administration.EntityFrameworkCore/MyProjectName.Administration.EntityFrameworkCore.csproj", "services/administration/src/MyProjectName.Administration.EntityFrameworkCore/"]
COPY ["services/administration/src/MyProjectName.Administration.Domain/MyProjectName.Administration.Domain.csproj", "services/administration/src/MyProjectName.Administration.Domain/"]
COPY ["services/administration/src/MyProjectName.Administration.Domain.Shared/MyProjectName.Administration.Domain.Shared.csproj", "services/administration/src/MyProjectName.Administration.Domain.Shared/"]
COPY ["services/saas/src/MyProjectName.SaaS.HttpApi/MyProjectName.SaaS.HttpApi.csproj", "services/saas/src/MyProjectName.SaaS.HttpApi/"]
COPY ["services/saas/src/MyProjectName.SaaS.Application.Contracts/MyProjectName.SaaS.Application.Contracts.csproj", "services/saas/src/MyProjectName.SaaS.Application.Contracts/"]
COPY ["services/saas/src/MyProjectName.SaaS.Domain.Shared/MyProjectName.SaaS.Domain.Shared.csproj", "services/saas/src/MyProjectName.SaaS.Domain.Shared/"]
COPY ["services/saas/src/MyProjectName.SaaS.Application/MyProjectName.SaaS.Application.csproj", "services/saas/src/MyProjectName.SaaS.Application/"]
COPY ["services/saas/src/MyProjectName.SaaS.Domain/MyProjectName.SaaS.Domain.csproj", "services/saas/src/MyProjectName.SaaS.Domain/"]
COPY ["services/saas/src/MyProjectName.SaaS.EntityFrameworkCore/MyProjectName.SaaS.EntityFrameworkCore.csproj", "services/saas/src/MyProjectName.SaaS.EntityFrameworkCore/"]
RUN dotnet restore "services/saas/host/MyProjectName.SaaS.HttpApi.Host/MyProjectName.SaaS.HttpApi.Host.csproj"
COPY . .
WORKDIR "/src/services/saas/host/MyProjectName.SaaS.HttpApi.Host"
RUN dotnet build "MyProjectName.SaaS.HttpApi.Host.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MyProjectName.SaaS.HttpApi.Host.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MyProjectName.SaaS.HttpApi.Host.dll"]