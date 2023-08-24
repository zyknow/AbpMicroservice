# Zyknow.Abp.Microservice

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://mit-license.org/)
[![GitHub Stars](https://img.shields.io/github/stars/zyknow/AbpMicroservice.svg)](https://github.com/zyknow/AbpMicroservice/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/zyknow/AbpMicroservice.svg)](https://github.com/zyknow/AbpMicroservice/issues)

English| [简体中文](./README.zh-CN.md)

## Introduction

This project is a microservice template based on the [ABP Framework](https://docs.abp.io/) and reference
form [antosubash/AbpMicroservice](https://github.com/antosubash/AbpMicroservice),
to using dotnet new to create microservice project and microservice service template project.

## Nuget Packages

| Name                             | Version                                                                                                                                                                      | Download                                                                                                                                                                      |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Zyknow.Abp.Microservice.Template | [![Zyknow.Abp.Microservice.Template](https://img.shields.io/nuget/v/Zyknow.Abp.Microservice.Template.svg)](https://www.nuget.org/packages/Zyknow.Abp.Microservice.Template/) | [![Zyknow.Abp.Microservice.Template](https://img.shields.io/nuget/dt/Zyknow.Abp.Microservice.Template.svg)](https://www.nuget.org/packages/Zyknow.Abp.Microservice.Template/) |

## Features

- [x] Microservice Template
- [x] Microservice Service Template
- [x] `Kibana` + `Elasticsearch` Distributed Log Query
- [x] `Grafana` + `rometheus` Monitoring Center
- [x] `OpenTelemetry` `Jaeger` Distributed tracing
- [x] `Apollo` Configuration Center
- [x] `Yarp` Gateway
- [x] `RabbitMQ` Message Queue
- [x] `Minio` Distributed Storage
- [x] `Tye` Support
- [x] `Blazor Server` Web App
    - [ ] Use [Masa](https://www.masastack.com/framework) Blazor UI
- [x] `Vue3 Quasar` Web App
    - [ ] Basic Pages
- [ ] `Avalonia` Startup Template
- [ ] `Maui` Startup App
- [ ] `DockerFile`
- [ ] `K8s` k8s Template

## Usage

---

### Using Dotnet Create You Microservice Project

- install microservice template on dotnet
  ```shell
  dotnet new install Zyknow.Abp.Microservice.Template
  ```

#### Create Microservice Project

```shell
dotnet new zabp-ms -n YourMicroserviceName
```

#### Create New Service And Use

* you better run the command in services folder
  ```shell
  dotnet new zabp-ms-s -n YourServiceProjectName
  ```

* copy `YourServiceProjectName\YourServiceProjectName.ps1` to services folder and run.
  that will fix the service folder path,and add service to `tye.yaml`,add to root sln,you can see all code in
  YourServiceProjectName\YourServiceProjectName.ps1

  > :warning: ** please save you all data or to submit git。
  ```shell
    ./YourServiceProjectName.ps1
    ```

* after run,you can see like this,and you can delete this script.

```csharp
(base) PS G:\Mj\MijinLibrary\services> .\MijinLibrary.BookInfoService.ps1
------------------------------------------------------------------
------------------------------------------------------------------
##########################################检查路径##############################################
检查完成
##########################################修改文件夹名##############################################
文件夹已重命名为 book-info。
修改完成
####################################修复替换项目文件名称以及文件和文件夹####################################
ProjectName: BookInfo
slnName: MijinLibrary
替换完成
####################################添加到Root解决方案####################################
找到解决方案文件: G:\Mj\MijinLibrary\MijinLibrary.sln
找到解决方案文件: G:\Mj\MijinLibrary\MijinLibrary.sln
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.Application\MijinLibrary.BookInfoService.Application.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.Application\MijinLibrary.BookInfoService.Application.csproj”添加到解决方案中。
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.Application.Contracts\MijinLibrary.BookInfoService.Application.Contracts.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.Application.Contracts\MijinLibrary.BookInfoService.Application.Contracts.csproj”添加到解决方案中。
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.Domain\MijinLibrary.BookInfoService.Domain.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.Domain\MijinLibrary.BookInfoService.Domain.csproj”添加到解决方案中。
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.Domain.Shared\MijinLibrary.BookInfoService.Domain.Shared.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.Domain.Shared\MijinLibrary.BookInfoService.Domain.Shared.csproj”添加到解决方案中。
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.EntityFrameworkCore\MijinLibrary.BookInfoService.EntityFrameworkCore.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.EntityFrameworkCore\MijinLibrary.BookInfoService.EntityFrameworkCore.csproj”添加到解决方案中。
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.HttpApi\MijinLibrary.BookInfoService.HttpApi.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.HttpApi\MijinLibrary.BookInfoService.HttpApi.csproj”添加到解决方案中。
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.HttpApi.Client\MijinLibrary.BookInfoService.HttpApi.Client.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.HttpApi.Client\MijinLibrary.BookInfoService.HttpApi.Client.csproj”添加到解决方案中。
正在添加项目: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.HttpApi.Host\MijinLibrary.BookInfoService.HttpApi.Host.csproj
已将项目“services\book-info\src\MijinLibrary.BookInfoService.HttpApi.Host\MijinLibrary.BookInfoService.HttpApi.Host.csproj”添加到解决方案中。
操作完成
###############################修改端口号/添加端口号到网关和Auth Service####################################
请输入该服务的端口号: 51000
已更新文件: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.HttpApi.Host\appsettings.json
已更新文件: G:\Mj\MijinLibrary\services\book-info\src\MijinLibrary.BookInfoService.HttpApi.Host\Properties\launchSettings.json
开始添加端口号到网关和Auth Service
指定的URL已存在于文件: G:\Mj\MijinLibrary\gateways\internal\src\MijinLibrary.InternalGateway\bin\Debug\net7.0\appsettings.json.FullName 中。
已更新文件: G:\Mj\MijinLibrary\gateways\internal\src\MijinLibrary.InternalGateway\appsettings.json.FullName
指定的URL已存在于文件: G:\Mj\MijinLibrary\gateways\web\src\MijinLibrary.WebGateway\bin\Debug\net7.0\appsettings.json.FullName 中。
已更新文件: G:\Mj\MijinLibrary\gateways\web\src\MijinLibrary.WebGateway\appsettings.json.FullName
指定的URL已存在于文件: G:\Mj\MijinLibrary\apps\auth-server\src\MijinLibrary.AuthServer\bin\Debug\net7.0\appsettings.json.FullName 中。
已更新文件: G:\Mj\MijinLibrary\apps\auth-server\src\MijinLibrary.AuthServer\appsettings.json.FullName
操作完成
###############################添加到tye和prometheus.yml####################################
已添加内容到 G:\Mj\MijinLibrary\tye.yaml。
修改prometheus.yml
已添加内容到 G:\Mj\MijinLibrary\etc\prometheus\prometheus.yml。
###############################更新DbMigrator Appsettings.json####################################
指定的ConnectionStrings已存在于 G:\Mj\MijinLibrary\shared\MijinLibrary.DbMigrator\bin\Debug\net7.0\appsettings.json 中。
指定的OpenIddict/Resources已存在于 G:\Mj\MijinLibrary\shared\MijinLibrary.DbMigrator\bin\Debug\net7.0\appsettings.json 中。
已添加ConnectionStrings内容到 G:\Mj\MijinLibrary\shared\MijinLibrary.DbMigrator\appsettings.json。
已添加OpenIddict/Resources内容到 G:\Mj\MijinLibrary\shared\MijinLibrary.DbMigrator\appsettings.json。
操作完成
###############################添加到AppServiceConsts####################################
已添加常量内容到 G:\Mj\MijinLibrary\shared\MijinLibrary.Shared.Definition\AppServiceConsts.cs。
已添加字典内容到 G:\Mj\MijinLibrary\shared\MijinLibrary.Shared.Definition\AppServiceConsts.cs。
操作完成
```

* build you sln and run tye
  ```shell
  dotnet build
  ./run-tye.ps1
  ```

---

### Run Microservice

#### Run Docker Compose in `ms\src\etc\docker`

##### select you need docker environment dependency

* `dev_up.ps1` is lowest environment dependency
* `up.ps1` is full environment dependency

##### run docker compose on `powershell`

```shell
./dev_up.ps1
```

or

```shell
./up.ps1
```

##### install ssl certificate in `src\etc\dev-cert\localhost.pfx`

you must install ssl certificate in you local machine,otherwise https will report an error

or delete `localhost.pfx`,`run-tye.ps1` will create a new certificate

##### build microservice project in `src`

```shell
dotnet build
```

##### run

you also can use `-p` to change tye port,like `./run-tye.ps1 -p 8001`

```shell
./run-tye.ps1
```

or watch run

```shell
./run-tye.ps1 --watch
```

### Thanks

[Rider](https://www.jetbrains.com/zh-cn/rider/)

## Author

[Zyknow](https://github.com/zyknow)

## License

> You can check out the full license [here](https://github.com/zyknow/AbpMicroservice/blob/master/LICENSE)

This project is licensed under the terms of the **MIT** license.
