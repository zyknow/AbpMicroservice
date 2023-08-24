function Split-ByUpperCase {
    param(
        [Parameter(Mandatory=$true)]
        [string]$InputString
    )

    $str = [regex]::Replace($InputString, '(\p{Lu})', ' $1')
    $words = $str.Trim() -split ' '

    return $words
}

function Convert-ToKebabCase {
    param(
        [Parameter(Mandatory=$true)]
        [string]$InputString
    )

    $words = Split-ByUpperCase -InputString $InputString
    $words = $words | ForEach-Object { $_.ToLower() }
    $snake_case = $words -join '-'

    return $snake_case
}

# use $kebab_case = Convert-ToKebabCase -InputString $myString


"------------------------------------------------------------------"
$serviceKebabCaseName = "librarian-assistant"
$serviceName
$slnFolderPath = "G:\Mj\MjLibrary"
$slnPath
$slnName
$fullServiceName = "LibrarianAssistantService"
"------------------------------------------------------------------"


"##########################################检查路径##############################################"



# 获取当前脚本的名称（不包括扩展名）
$scriptName = [System.IO.Path]::GetFileNameWithoutExtension($MyInvocation.MyCommand.Name)

# 检查是否存在与脚本同名的文件夹
if (-Not (Test-Path -Path ".\$scriptName" -PathType Container)) {
    Write-Host "路径错误，请放置到微服务项目中的services文件夹   或不存在需要转换的Service文件夹"
    $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
    exit
}

# 检查当前路径下是否有.sln文件
$slnFiles = Get-ChildItem -Path "." -Filter "*.sln"
if ($slnFiles.Count -gt 0) {
    Write-Host "路径错误，请放置到微服务项目中的services文件夹   或不存在需要转换的Service文件夹"
    $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") | Out-Null
    exit
}

Write-Host "检查完成"

Write-Host "请输入 $scriptName 服务的端口号"
Write-Host "Enter the port number for the $scriptName service"
# 提示用户输入端口号
$portNumber = Read-Host "Port"

"##########################################修改文件夹名##############################################"

# 获取当前脚本的名称
$scriptName = [System.IO.Path]::GetFileNameWithoutExtension($MyInvocation.MyCommand.Name)

# 从脚本名称中提取所需的部分，排除"Service"及其后的内容
$folderName = $scriptName -replace "Service.*$"

# 在上一层目录中查找.sln文件
$slnFile = Get-ChildItem -Path "..\" -Filter "*.sln" | Select-Object -First 1

# 如果找到.sln文件，则替换文件夹名称
if ($null -ne $slnFile) {
    $slnFileNameWithoutExtension = [System.IO.Path]::GetFileNameWithoutExtension($slnFile.Name)
    $folderName = $folderName -replace "^$slnFileNameWithoutExtension\.", ""
}

# 获取剩余的部分
$serviceName = $folderName.Substring($folderName.LastIndexOf('.') + 1)
$serviceKebabCaseName = Convert-ToKebabCase -InputString $serviceName

# 检查文件夹是否存在
if (Test-Path -Path $scriptName -PathType Container) {
    # 重命名文件夹
    Rename-Item -Path $scriptName -NewName $serviceKebabCaseName
    Write-Host "文件夹已重命名为 $serviceKebabCaseName。"
} else {
    Write-Host "文件夹 $scriptName 不存在。"
}

# 检查文件夹是否存在
if (Test-Path -Path $serviceKebabCaseName -PathType Container) {
    # 切换到该文件夹
    Set-Location -Path $serviceKebabCaseName
} else {
    Write-Host "文件夹 $serviceKebabCaseName 不存在。"
    # 可选择创建文件夹或提供其他错误处理
}
# 获取当前执行路径
$currentPath = Get-Location
# 提取slnName
$slnPath = Get-Item -Path "$currentPath\..\..\*.sln" | Select-Object -First 1
# 检查slnPath是否存在
if ($null -eq $slnPath) {
    Write-Host "解决方案文件不存在。请确保路径正确。"
    exit
}

$slnName = [System.IO.Path]::GetFileNameWithoutExtension($slnPath)

Write-Host "修改完成"
"####################################修复替换项目文件名称以及文件和文件夹####################################"



# 提取projectName
$projectName = $serviceName

Write-Host "ProjectName: $projectName"
Write-Host "slnName: $slnName"

Get-ChildItem -Recurse | Where-Object { $_.FullName -notmatch "\\bin\\" -and $_.FullName -notmatch "\\obj\\" -and $_.FullName -notmatch "replace.ps1" -and !$_.PSIsContainer } | ForEach-Object {
    (Get-Content $_.FullName) | ForEach-Object { $_ -replace "Product", $projectName -replace "AbpMicroservice", $slnName } | Set-Content $_.FullName
}

Write-Host "替换完成"

"####################################添加到Root解决方案####################################"

# 递归向上查找解决方案文件
#Write-Host "正在查找解决方案文件..."
#$currentPath = Get-Location
#while ($null -eq $slnPath) {
#    $slnPath = Get-ChildItem -Path $currentPath -Filter "$slnName.sln" | Select-Object -First 1
#    if ($null -eq $slnPath) {
#        $parentPath = (Get-Item $currentPath).Parent
#        if ($parentPath -eq $null) {
#            Write-Host "已到达根目录，停止搜索。"
#            break
#        } else {
#            $currentPath = $parentPath.FullName
#        }
#    }
#}

if ($null -ne $slnPath) {
    Write-Host "找到解决方案文件: $slnPath"
} else {
    Write-Host "未找到解决方案文件。"
    exit
}

Write-Host "找到解决方案文件: $slnPath"

# 添加所有.csproj文件
Get-ChildItem -Path "./src" -Filter "*.csproj" -Recurse | ForEach-Object {
    $csprojFilePath = $_.FullName
    Write-Host "正在添加项目: $csprojFilePath"
    dotnet sln $slnPath add $csprojFilePath --solution-folder "services/$serviceName"
}

Write-Host "操作完成"


"###############################修改端口号/添加端口号到网关和Auth Service####################################"
$slnFolderPath = [System.IO.Path]::GetDirectoryName($slnPath)


# 验证端口号是否有效
if ($portNumber -notmatch "^\d{1,5}$" -or [int]$portNumber -lt 1 -or [int]$portNumber -gt 65535) {
    Write-Host "无效的端口号。端口号必须是1到65535之间的整数。"
    exit
}

# 定义要替换的路径
$appsettingsPath = ".\src\*HttpApi.Host\appsettings.json"
$launchSettingsPath = ".\src\*HttpApi.Host\Properties\launchSettings.json"

# 替换appsettings.json中的端口号
Get-ChildItem -Path $appsettingsPath -Recurse | ForEach-Object {
    (Get-Content $_.FullName) | ForEach-Object { $_ -replace "44004", $portNumber } | Set-Content $_.FullName
    Write-Host "已更新文件: $_"
}

# 替换launchSettings.json中的端口号
Get-ChildItem -Path $launchSettingsPath -Recurse | ForEach-Object {
    (Get-Content $_.FullName) | ForEach-Object { $_ -replace "44004", $portNumber } | Set-Content $_.FullName
    Write-Host "已更新文件: $_"
}

"开始添加端口号到网关和Auth Service"

# 定义要添加的URL
$urlToAdd = "https://localhost:$portNumber"

# 定义要搜索的路径
$appsettingsPaths = @(
    "$slnFolderPath\gateways\*\*\*\appsettings.json",
    "$slnFolderPath\apps\auth-server\src\$slnName.AuthServer\appsettings.json"
)

# 遍历每个路径
foreach ($path in $appsettingsPaths) {
    # 获取匹配的文件
    Get-ChildItem -Path $path -Recurse | ForEach-Object {
        # 读取文件内容并转换为JSON对象
        $jsonContent = Get-Content $_.FullName | ConvertFrom-Json

        # 获取CorsOrigins的值
        $corsOrigins = $jsonContent.App.CorsOrigins

        # 检查URL是否已存在
        if ($corsOrigins.Split(',') -notcontains $urlToAdd) {
            # 如果不存在，则添加URL
            if (-not $corsOrigins.EndsWith(',')) {
                # 如果CorsOrigins不以逗号结尾，则添加逗号
                $corsOrigins += ","
            }
            $corsOrigins += $urlToAdd

            # 更新JSON对象
            $jsonContent.App.CorsOrigins = $corsOrigins

            # 将更新后的JSON对象转换回文本并保存到文件
            $jsonContent | ConvertTo-Json -Depth 32 | Set-Content $_.FullName

            Write-Host "已更新文件: $_.FullName"
        } else {
            Write-Host "指定的URL已存在于文件: $_.FullName 中。"
        }
    }
}

Write-Host "操作完成"



"###############################添加到tye和prometheus.yml####################################"

# 获取当前文件夹名称作为$serviceName

# 获取当前文件夹下的src\下的名叫.HttpApi.Host结尾的文件夹下的第一个csproj
$projectPath = Get-ChildItem -Path ".\src\*HttpApi.Host\*.csproj" | Select-Object -First 1
if ($null -eq $projectPath) {
    Write-Host "未找到指定的csproj文件。请检查路径和文件位置。"
    exit
}

$index = $projectPath.FullName.IndexOf("services")
$projectFullPath = $projectPath.FullName
$projectPath = $projectFullPath.Substring($index)

# 定义tye.yaml的路径
$tyeYamlPath = Join-Path $slnFolderPath "tye.yaml"

$tpItemName = $serviceKebabCaseName + "-service"



# 定义要添加的内容
$contentToAdd = @"

  - name: $tpItemName
    project: $projectPath
    bindings:
      - protocol: https
        port: $portNumber
    env:
      - Kestrel__Certificates__Default__Path=../../../../etc/dev-cert/localhost.pfx
      - Kestrel__Certificates__Default__Password=3a0aeff5-4f70-6e81-be8e-c7309b6ed517
"@

# 检查tye.yaml是否存在
if (Test-Path -Path $tyeYamlPath) {
    # 如果存在，则读取内容并检查是否已包含指定的节点
    $tyeYamlContent = Get-Content -Path $tyeYamlPath
    if ($tyeYamlContent -notcontains $contentToAdd) {
        # 如果不存在，则添加内容
        Add-Content -Path $tyeYamlPath -Value $contentToAdd
        Write-Host "已添加内容到 $tyeYamlPath。"
    } else {
        Write-Host "指定的内容已存在于 $tyeYamlPath 中。"
    }
} else {
    # 如果不存在，则创建文件并添加内容
    New-Item -Path $tyeYamlPath -ItemType File
    Set-Content -Path $tyeYamlPath -Value $contentToAdd
    Write-Host "已创建 $tyeYamlPath 并添加内容。"
}

"修改prometheus.yml"

# 定义prometheus.yml的路径
$prometheusYmlPath = "$slnFolderPath\etc\prometheus\prometheus.yml"

# 定义要添加的内容
$contentToAdd = @"

  - job_name: '$tpItemName'
    scheme: https
    metrics_path: 'metrics'
    tls_config:
      insecure_skip_verify: true
    static_configs:
    - targets: ['host.docker.internal:$portNumber']
"@

# 检查prometheus.yml是否存在
if (Test-Path -Path $prometheusYmlPath) {
    # 如果存在，则读取内容并检查是否已包含指定的节点
    $prometheusYmlContent = Get-Content -Path $prometheusYmlPath -Raw

    # 使用正则表达式检查job_name是否存在
    if ($prometheusYmlContent -notmatch "job_name:\s*'$tpItemName'") {
        # 如果不存在，则添加内容
        Add-Content -Path $prometheusYmlPath -Value $contentToAdd
        Write-Host "已添加内容到 $prometheusYmlPath。"
    } else {
        Write-Host "指定的节点已存在于 $prometheusYmlPath 中。"
    }
} else {
    Write-Host "未找到文件 $prometheusYmlPath。请检查路径和文件位置。"
}


"###############################更新DbMigrator####################################"

"------------------Appsettings----------------------"
# 定义appsettings.json的路径
$appsettingsJsonPath = "$slnFolderPath\shared\*DbMigrator\appsettings.json"

$migratorItemkey = $serviceName + "Service"



# 获取匹配的文件
Get-ChildItem -Path $appsettingsJsonPath -Recurse | ForEach-Object {
    # 读取文件内容并转换为JSON对象
    $jsonContent = Get-Content $_.FullName | ConvertFrom-Json

    # 检查ConnectionStrings节点是否存在指定的键
    if ($null -eq $jsonContent.ConnectionStrings.$migratorItemkey) {
        # 如果不存在，则添加内容
        $jsonContent.ConnectionStrings | Add-Member -Type NoteProperty -Name $migratorItemkey -Value "User ID=postgres;Password=postgres;Host=localhost;Port=5432;Database=$slnName_$serviceName;Pooling=false;"
        Write-Host "已添加ConnectionStrings内容到 $_。"
    } else {
        Write-Host "指定的ConnectionStrings已存在于 $_ 中。"
    }

    # 检查OpenIddict/Resources节点是否存在指定的键
    if ($null -eq $jsonContent.OpenIddict.Resources.$migratorItemkey) {
        # 如果不存在，则添加内容
        $jsonContent.OpenIddict.Resources | Add-Member -Type NoteProperty -Name $migratorItemkey -Value @{ "RootUrl" = "https://localhost:$portNumber" }
        Write-Host "已添加OpenIddict/Resources内容到 $_。"
    } else {
        Write-Host "指定的OpenIddict/Resources已存在于 $_ 中。"
    }

    # 将更新后的JSON对象转换回文本并保存到文件
    $jsonContent | ConvertTo-Json -Depth 32 | Set-Content $_.FullName
}

Write-Host "操作完成"

"------------------DbMigrationService----------------------"
$fullServiceName = $serviceName + "Service"

$fullServiceNameDbContext = $fullServiceName + "DbContext"


# 定义要插入的内容
$insertContent = "await MigrateDatabaseAsync<$fullServiceNameDbContext>(cancellationToken);"

# 获取确切的文件路径
$dbMigrationServiceFile = Get-ChildItem -Path "$slnFolderPath\shared\*.DbMigrator" -Filter "*DbMigrationService.cs" -Recurse | Select-Object -First 1

# 检查文件是否存在
if ($null -eq $dbMigrationServiceFile) {
    Write-Host "未找到文件：*DbMigrationService.cs"
    exit
}

$insertNamespace = "using $slnName.$fullServiceName.EntityFrameworkCore;"
# 读取文件内容
$content = Get-Content -Path $dbMigrationServiceFile -Raw

# 检查文件内容是否已包含该命名空间
if ($content -notmatch [regex]::Escape($insertNamespace)) {
    # 在文件的开头插入新的命名空间
    $content = $insertNamespace + "`r`n" + $content
    Set-Content -Path $dbMigrationServiceFile.FullName -Value $content
    Write-Host "已在文件 $dbMigrationServiceFile 中插入命名空间。"
} else {
    Write-Host "文件 $dbMigrationServiceFile 已包含命名空间。"
}


# 读取文件内容
$content = Get-Content -Path $dbMigrationServiceFile.FullName

# 查找 await uow.CompleteAsync(cancellationToken); 的位置
$awaitUowCompleteAsyncIndex = $content | Select-String -Pattern 'await uow.CompleteAsync\(cancellationToken\);' | Select-Object LineNumber

# 如果找到了位置，插入新代码
if ($null -ne $awaitUowCompleteAsyncIndex) {
    $insertionLine = $awaitUowCompleteAsyncIndex.LineNumber - 1
    $content = $content[0..($insertionLine - 1)] + "await MigrateDatabaseAsync<$fullServiceNameDbContext>(cancellationToken);" + $content[$insertionLine..$content.Length]
    $content | Set-Content -Path $dbMigrationServiceFile.FullName
    Write-Host "已在文件 $dbMigrationServiceFile 中插入代码。"
} else {
    Write-Host "在文件 $dbMigrationServiceFile 中未找到插入点。"
}


"------------------DbMigratorModule----------------------"




# 获取文件路径
$dbMigratorModuleFile = Get-ChildItem -Path "$slnFolderPath\shared\*.DbMigrator" -Filter "*DbMigratorModule.cs" -Recurse | Select-Object -First 1


$insertNamespace = "using $slnName.$fullServiceName.EntityFrameworkCore;" + "`r`n" + "using $slnName.$fullServiceName;"

# 读取文件内容
$content = Get-Content -Path $dbMigratorModuleFile -Raw

# 检查文件内容是否已包含该命名空间
if ($content -notmatch [regex]::Escape($insertNamespace)) {
    # 在文件的开头插入新的命名空间
    $content = $insertNamespace + "`r`n" + $content
    Set-Content -Path $dbMigratorModuleFile.FullName -Value $content
    Write-Host "已在文件 $dbMigratorModuleFile 中插入命名空间。"
} else {
    Write-Host "文件 $dbMigratorModuleFile 已包含命名空间。"
}


# 读取文件内容
$content = Get-Content -Path $dbMigratorModuleFile.FullName


# 找到 [DependsOn( 行的索引
$dependsOnIndex = $content | Select-String -Pattern '\[DependsOn\(' | Select-Object LineNumber | ForEach-Object { $_.LineNumber - 1 }

# 构建新的内容
$newContent = "    typeof($fullServiceName" + "EntityFrameworkCoreModule)," + "`r`n    typeof($fullServiceName" + "ApplicationContractsModule),"

# 将新内容插入到 DependsOn 属性的顶部
$content = $content[0..$dependsOnIndex] + $newContent + $content[($dependsOnIndex + 1)..($content.Length - 1)]

# 写入文件
$content | Set-Content -Path $dbMigratorModuleFile.FullName

Write-Host "已在文件 $dbMigratorModuleFile 中插入代码。"




"------------------DbMigrator csrpoj Reference ----------------------"

# 获取当前脚本所在的路径
$currentPath = Get-Location

# 获取目标.csproj文件
$dbMigratorCsprojFile = Get-ChildItem -Path "$slnFolderPath\shared\*.DbMigrator" -Filter "*.csproj" -Recurse | Select-Object -First 1

# 获取需要添加引用的.csproj文件
$applicationContractsCsprojFiles = Get-ChildItem -Path "$currentPath\src\*Application.Contracts" -Filter "*.csproj" -Recurse
$entityFrameworkCoreCsprojFiles = Get-ChildItem -Path "$currentPath\src\*EntityFrameworkCore" -Filter "*.csproj" -Recurse

# 将找到的.csproj文件添加为引用
$allCsprojFiles = @($applicationContractsCsprojFiles; $entityFrameworkCoreCsprojFiles)
foreach ($csprojFile in $allCsprojFiles) {
    Write-Host "正在添加引用: $($csprojFile) 到 $($dbMigratorCsprojFile)"
    dotnet add $dbMigratorCsprojFile.FullName reference $csprojFile.FullName
}

Write-Host "引用添加完成。"



"###############################添加到AppServiceConsts####################################"
# 定义AppServiceConsts.cs的路径
$appServiceConstsPath = "$slnFolderPath\shared\*.Shared.Definition\AppServiceConsts.cs"

# 定义服务名称

$fullServiceNameName = $serviceName + "ServiceName"
$fullServiceNameDisplayName = $serviceName + "ServiceDisplayName"

$fullServiceNameNameValue = $serviceName + "Service"
$fullServiceNameDisplayNameValue = $serviceName + " Service"

# 定义要添加的常量内容
$constantsToAdd = @"
    public const string $fullServiceNameName = "$fullServiceNameNameValue";
    public const string $fullServiceNameDisplayName = "$fullServiceNameDisplayNameValue";
"@

# 定义要添加的字典内容
$dictionaryToAdd = @"
            {$fullServiceNameName, $fullServiceNameDisplayName},
"@

# 获取匹配的文件
Get-ChildItem -Path $appServiceConstsPath -Recurse | ForEach-Object {
    # 读取文件内容
    $fileContent = Get-Content $_ -Raw

    # 检查是否存在指定的常量
    if ($fileContent -notmatch "public const string $fullServiceNameName") {
        # 如果不存在，则添加常量内容
        $fileContent = $fileContent -replace "(public static Dictionary<string, string> GetAllServiceNameDescDic\(\))", "$constantsToAdd`r`n`$1"
        Write-Host "已添加常量内容到 $_。"
    } else {
        Write-Host "指定的常量已存在于 $_ 中。"
    }

    # 检查是否存在指定的字典项
    if ($fileContent -notmatch "{$fullServiceNameName, $fullServiceNameDisplayName}") {
        # 如果不存在，则添加字典内容
        $fileContent = $fileContent -replace "(        {.*},\s*\n\s*)\}", "`$1$dictionaryToAdd`r`n        }"
        Write-Host "已添加字典内容到 $_。"
    } else {
        Write-Host "指定的字典项已存在于 $_ 中。"
    }

    # 保存更新后的文件内容
    Set-Content -Path $_ -Value $fileContent
}

Write-Host "操作完成"



"###############################添加Blazor csrpoj Reference and module ####################################"

# 获取 Blazor 项目的路径
$blazorCsproj = Get-ChildItem -Path "$slnFolderPath\apps\blazor\src\*.Blazor\*.csproj" | Select-Object -First 1

# 获取 HttpApi.Host 项目的路径
$hostCsproj = Get-ChildItem -Path ".\src\*.HttpApi.Client\*.csproj" | Select-Object -First 1

# 检查是否找到了项目文件
if ($null -eq $blazorCsproj -or $null -eq $hostCsproj) {
    Write-Host "未找到项目文件，请检查路径。"
    exit 1
}

# 添加引用
& dotnet add $blazorCsproj.FullName reference $hostCsproj.FullName




# 找到 BlazorModule.cs 文件的路径
$blazorModuleCs = Get-ChildItem -Path "$slnFolderPath\apps\blazor\src\*.Blazor\*BlazorModule.cs" | Select-Object -First 1

# 检查是否找到了文件
if ($null -eq $blazorModuleCs) {
    Write-Host "未找到BlazorModule.cs文件，请检查路径。"
    exit 1
}

# 读取文件内容
$content = Get-Content -Path $blazorModuleCs.FullName

# 找到DependsOn节点并添加新的依赖
$dependsOnLine = $content | Select-String -Pattern 'typeof\(' | Select-Object -First 1
$newDepend = "typeof("+$fullServiceName+"HttpApiClientModule)," + "`r`n"
$updatedDependsOnLine = $dependsOnLine -replace 'typeof\(', "$newDepend typeof("
$content[$content.IndexOf($dependsOnLine)] = $updatedDependsOnLine

# 将修改后的内容写回文件
Set-Content -Path $blazorModuleCs.FullName -Value $content



# 读取文件内容
$content = Get-Content -Path $blazorModuleCs.FullName

# 添加新的命名空间到文件最顶部
$newUsing = "using $slnName.$fullServiceName;"
$content = @($newUsing) + $content

# 将修改后的内容写回文件
Set-Content -Path $blazorModuleCs.FullName -Value $content

"##########################add Routes and Clusters in gateways yarp.json #################################"
# 找到所有匹配的 yarp.json 文件
$yarpJsonFiles = Get-ChildItem -Path "$slnFolderPath\gateways\*\src\*Gateway\yarp.json" -Recurse

foreach ($yarpJsonFile in $yarpJsonFiles) {
    # 读取 JSON 文件内容
    $jsonContent = Get-Content -Path $yarpJsonFile.FullName | ConvertFrom-Json

    # 创建 Routes 对象
    $routesObject = @{
        "ClusterId" = $fullServiceName
        "Match"     = @{
            "Path" = "/api/$serviceKebabCaseName/{*any}"
        }
    }

    # 创建 Clusters 对象
    $clustersObject = @{
        "Destinations" = @{
            "destination1" = @{
                "Address" = $urlToAdd
            }
        }
    }

    # 向 Yarp/Routes 节点下添加对象
    $jsonContent.Yarp.Routes | Add-Member -Name $serviceKebabCaseName -Value $routesObject -MemberType NoteProperty -Force

    # 向 Yarp/Clusters 节点下添加对象
    $jsonContent.Yarp.Clusters | Add-Member -Name $fullServiceName -Value $clustersObject -MemberType NoteProperty -Force

    # 将修改后的内容写回文件
    $jsonContent | ConvertTo-Json -Depth 10 | Set-Content -Path $yarpJsonFile.FullName
}

Write-Host "所有 yarp.json 文件已成功修改。"