FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["gateways/internal/src/AbpMicroservice.InternalGateway/AbpMicroservice.InternalGateway.csproj", "gateways/internal/src/AbpMicroservice.InternalGateway/"]
RUN dotnet restore "gateways/internal/src/AbpMicroservice.InternalGateway/AbpMicroservice.InternalGateway.csproj"
COPY . .
WORKDIR "/src/gateways/internal/src/AbpMicroservice.InternalGateway"
RUN dotnet build "AbpMicroservice.InternalGateway.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AbpMicroservice.InternalGateway.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AbpMicroservice.InternalGateway.dll"]
