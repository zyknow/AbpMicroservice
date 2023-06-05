rem your key
rem nuget setApikey {your key} -Source https://api.nuget.org/v3/index.json

@ECHO off
cls

IF not EXIST ".packages" (	
	ECHO start build sln...
	dotnet build AbpMicroservice.Template.sln -c Debug

	ECHO install nupkg...
	dotnet new install ".packages\*.nupkg"


	ECHO all command have been successfully.
)

nuget push ".packages\*.nupkg" -Source https://api.nuget.org/v3/index.json


ECHO all command have been successfully.

pause > nul