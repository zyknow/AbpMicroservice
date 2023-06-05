@ECHO off
cls

ECHO Deleting all BIN,OBJ,Logs,node_modules and docker storage folders...
ECHO.

FOR /d /r . %%d in (bin,obj,node_modules,Logs) DO (
	IF EXIST "%%d" (		 	 
		ECHO %%d | FIND /I "\node_modules\" > Nul && ( 
			ECHO.Skipping: %%d
		) || (
			ECHO.Deleting: %%d
			rd /s/q "%%d"
		)
	)
)

ECHO.

IF EXIST "etc\grafana" (	
	ECHO.Deleting: etc\grafana	 	 
	rd /s/q ".\etc\grafana"
)

IF EXIST "etc\prometheus\storage" (	
      ECHO.Deleting: etc\prometheus\storage 	 
	rd /s/q ".\etc\prometheus\storage"
)



ECHO.BIN,OBJ,Logs,node_modules and docker storage folders have been successfully deleted. Press any key to exit.
pause > nul