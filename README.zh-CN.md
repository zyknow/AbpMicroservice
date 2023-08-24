# Zyknow.Abp.Microservice

[![GitHub许可证](https://img.shields.io/badge/license-MIT-blue.svg)](https://mit-license.org/)
[![GitHub星标](https://img.shields.io/github/stars/zyknow/AbpMicroservice.svg)](https://github.com/zyknow/AbpMicroservice/stargazers)
[![GitHub问题](https://img.shields.io/github/issues/zyknow/AbpMicroservice.svg)](https://github.com/zyknow/AbpMicroservice/issues)

简体中文 | [English](./README.md)

## 介绍

此项目是基于[ABP框架](https://docs.abp.io/)的微服务模板，并参考
[antosubash/AbpMicroservice](https://github.com/antosubash/AbpMicroservice)，
使用dotnet new创建微服务项目和微服务的服务模板项目。

## Nuget包

| 名称                             | 版本                                                                                                                                                                      | 下载                                                                                                                                                                      |
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Zyknow.Abp.Microservice.Template | [![Zyknow.Abp.Microservice.Template](https://img.shields.io/nuget/v/Zyknow.Abp.Microservice.Template.svg)](https://www.nuget.org/packages/Zyknow.Abp.Microservice.Template/) | [![Zyknow.Abp.Microservice.Template](https://img.shields.io/nuget/dt/Zyknow.Abp.Microservice.Template.svg)](https://www.nuget.org/packages/Zyknow.Abp.Microservice.Template/) |

## 特性

- [x] 微服务模板
- [x] 微服务服务模板
- [x] `Kibana` + `Elasticsearch` 分布式日志查询
- [x] `Grafana` + `rometheus` 监控中心
- [x] `OpenTelemetry` `Jaeger` 分布式追踪
- [x] `Apollo` 配置中心
- [x] `Yarp` 网关
- [x] `RabbitMQ` 消息队列
- [x] `Minio` 分布式存储
- [x] `Tye` 支持
- [x] `Blazor Server` 网页应用
    - [ ] 使用[Masa](https://www.masastack.com/framework) Blazor UI
- [x] `Vue3 Quasar` 网页应用
    - [ ] 基础页面
- [ ] `Avalonia` 启动模板
- [ ] `Maui` 应用

## 使用

---

### 使用Dotnet创建您的微服务项目

- 安装dotnet上的微服务模板
  ```shell
  dotnet new install Zyknow.Abp.Microservice.Template
  ```

#### 创建微服务项目

```shell
dotnet new zabp-ms -n 您的微服务名称
```

#### 创建新的微服务项目中的服务并使用

* 创建微服务中的服务项目
  ```shell
  dotnet new zabp-ms-s -n YourServiceProjectName
  ```

* 拷贝`YourServiceProjectName\YourServiceProjectName.ps1` 到 上一层目录中的services文件夹中
  运行该脚本，它将自动添加服务到微服务项目中，并且会修复一些命名问题，以及修改文件夹名称。
  > 警告： 操作前请先备份您的项目或保存git记录！！！
  ```shell
    ./YourServiceProjectName.ps1
    ```

* 运行完成后，你应该看到如下类似的结果，然后你可以删除该脚本了，如果遇到报错，请还原git或者还原项目，重新运行脚本试试。
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

* 构建整个项目并运行
  ```shell
  dotnet build
  ./run-tye.ps1
  ```
---

---

### 运行微服务

#### 在`ms\src\etc\docker`中运行Docker Compose

##### 选择您需要的docker环境依赖

* `dev_up.ps1` 是最低环境依赖
* `up.ps1` 是完整环境依赖

##### 在`powershell`上运行docker compose

```shell
./dev_up.ps1
```

或

```shell
./up.ps1
```

##### 在`src\etc\dev-cert\localhost.pfx`中安装ssl证书

您必须在本地机器上安装ssl证书，否则https会报错

或删除`localhost.pfx`，`run-tye.ps1`将创建一个新证书

##### 在`src`中构建微服务项目

```shell
dotnet build
```

##### 运行
您还可以使用`-p`来更改tye端口，例如`./run-tye.ps1 -p 8001`
```shell
./run-tye.ps1
```

或观察运行

```shell
./run-tye.ps1 --watch
```

### 感谢

[Rider](https://www.jetbrains.com/zh-cn/rider/)

## 作者

[Zyknow](https://github.com/zyknow)

## 许可证

> 您可以在[此处](https://github.com/zyknow/AbpMicroservice/blob/master/LICENSE)查看完整许可证

此项目根据**MIT**许可证的条款获得许可。
