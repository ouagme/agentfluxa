param(
  [string]$InstallDir = (Join-Path $HOME 'OUAGx'),
  [switch]$AddToPath
)

$ErrorActionPreference = 'Stop'
$source = 'https://ouagx.com/ouagx.ps1'
$target = Join-Path $InstallDir 'ouagx.ps1'

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Invoke-WebRequest -Uri $source -OutFile $target

$launcher = Join-Path $InstallDir 'ouagx.cmd'
Set-Content -Path $launcher -Encoding ascii -Value "@echo off`r`npowershell -NoProfile -ExecutionPolicy Bypass -File `"$target`" %*`r`n"

if ($AddToPath) {
  $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
  if (($userPath -split ';') -notcontains $InstallDir) {
    [Environment]::SetEnvironmentVariable('Path', "$userPath;$InstallDir", 'User')
  }
}

Write-Host "OUAGx installed to $InstallDir" -ForegroundColor Green
Write-Host "Run: $launcher" -ForegroundColor Cyan
Write-Host 'The client will ask for your provider API key on first run.'
