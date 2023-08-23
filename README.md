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

#### Create New Service

```shell
dotnet new zabp-ms-s -n YourServiceProjectName --sn YourServiceName
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
