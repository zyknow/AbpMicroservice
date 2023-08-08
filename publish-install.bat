@ECHO off
cls

IF EXIST ".packages" (	
	ECHO.Deleting: .packages	 	 
	rd /s/q ".packages"
)


ECHO start build sln...
dotnet build AbpMicroservice.Template.sln -c Release

ECHO install nupkg...
dotnet new install ".packages\*.nupkg"


ECHO all command have been successfully.

pause > nul



