Remove-Item -Recurse -Force "ms/src-s" -ErrorAction SilentlyContinue

Copy-Item -Recurse "ms/src/services/product" "ms/src-s"

Set-Location "ms/src-s"
Remove-Item -Recurse -Force "obj", "bin", ".idea", ".vs", "Logs", "node_modules" -ErrorAction SilentlyContinue

Set-Location "../.."

dotnet build "AbpMicroservice.Template.sln" --configuration Release --no-restore
