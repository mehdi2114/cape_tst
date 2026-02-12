Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)

' Open browser
WshShell.Run "http://localhost:5173", 1, False

' Wait 2 seconds
WScript.Sleep 2000

' Start server
WshShell.Run "cmd /c npm run dev", 1, False
