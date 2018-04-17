@echo off

set scriptPath=%~dp0
set parentPath=%scriptPath:~0,-8%

:: Change HKCU to HKLM if you want to install globally.
:: %~dp0 is the directory containing this bat script and ends with a backslash.

Reg.exe add "HKCU\SOFTWARE\Stephen McDaniel\TabController\Capabilities" /v "ApplicationDescription" /t REG_SZ /d "Tab Controller" /f
Reg.exe add "HKCU\SOFTWARE\Stephen McDaniel\TabController\Capabilities" /v "ApplicationIcon" /t REG_SZ /d "%parentPath%src\native-host\TabHelperHost\bin\debug\tabhelperhost.exe,0" /f
Reg.exe add "HKCU\SOFTWARE\Stephen McDaniel\TabController\Capabilities" /v "ApplicationName" /t REG_SZ /d "Tab Controller" /f
Reg.exe add "HKCU\SOFTWARE\Stephen McDaniel\TabController\Capabilities\FileAssociations" /v ".htm" /t REG_SZ /d "TabControllerURL" /f
Reg.exe add "HKCU\SOFTWARE\Stephen McDaniel\TabController\Capabilities\FileAssociations" /v ".html" /t REG_SZ /d "TabControllerURL" /f
Reg.exe add "HKCU\SOFTWARE\Stephen McDaniel\TabController\Capabilities\URLAssociations" /v "http" /t REG_SZ /d "TabControllerURL" /f
Reg.exe add "HKCU\SOFTWARE\Stephen McDaniel\TabController\Capabilities\URLAssociations" /v "https" /t REG_SZ /d "TabControllerURL" /f

REM ; Register to Default Programs
Reg.exe add "HKCU\SOFTWARE\RegisteredApplications" /v "TabController" /t REG_SZ /d "Software\Stephen McDaniel\TabController\Capabilities" /f

REM ; TabControllerURL HANDLER:
Reg.exe add "HKCU\Software\Classes\TabControllerURL" /ve /t REG_SZ /d "TabController Document" /f
Reg.exe add "HKCU\Software\Classes\TabControllerURL" /v "FriendlyTypeName" /t REG_SZ /d "TabController Document" /f
Reg.exe add "HKCU\Software\Classes\TabControllerURL\shell\open\command" /ve /t REG_SZ /d "\"%parentPath%src\native-host\TabHelperHost\bin\debug\tabhelperhost.exe\" new-tab \"%%1\"" /f

explorer.exe ms-settings:defaultapps

echo You must/can now select Tab Controller as your default Web Browser
