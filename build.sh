rm -rf ms/src-s

cp -r ms/src/services/product  ms/src-s

cd ms/src-s && rm -rf obj bin .idea .vs Logs node_modules

cd ../..

dotnet build AbpMicroservice.Template.sln --configuration Release --no-restore