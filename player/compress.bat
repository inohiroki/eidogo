@echo off

if not exist custom_rhino.jar (
    echo;
    echo Download the following file to this folder and try again:
    echo http://svn.dojotoolkit.org/dojo/trunk/buildscripts/lib/custom_rhino.jar
    echo;
	exit /b
)

set OUTFILE="js\all.compressed.js"
set JAVA="C:\Program Files (x86)\Java\jre7\bin\java.exe"
set RHINOC="custom_rhino.jar"

del %OUTFILE%

%JAVA% -jar %RHINOC% -c js/lang.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/eidogo.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/util.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c i18n/en.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/gametree.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/sgf.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/board.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/rules.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/player.js >> %OUTFILE%
%JAVA% -jar %RHINOC% -c js/init.js >> %OUTFILE%
