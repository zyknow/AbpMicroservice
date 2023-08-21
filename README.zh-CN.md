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

#### 创建新服务

```shell
dotnet new zabp-ms-s -n 您的服务名称
```

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
