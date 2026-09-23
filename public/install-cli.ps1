param(
  [string]$InstallDir = (Join-Path $HOME 'OUAGx-project'),
  [string]$ApiUrl = 'https://www.ouagx.com/api',
  [string]$ApiKey = '',
  [string]$Provider = 'ouagx-api',
  [string]$Model = 'openai/gpt-4.1-mini'
)

$ErrorActionPreference = 'Stop'
$repoZip = 'https://github.com/ouagme/agentfluxa/archive/refs/heads/main.zip'
$tempZip = Join-Path $env:TEMP 'ouagx-project.zip'
$tempDir = Join-Path $env:TEMP 'ouagx-project-source'

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  throw 'Node.js is required. Install it from https://nodejs.org/ and run this installer again.'
}
if (-not (Get-Command npm.cmd -ErrorAction SilentlyContinue)) {
  throw 'npm is required. Install Node.js from https://nodejs.org/ and run this installer again.'
}

if (-not $ApiKey) { $ApiKey = Read-Host 'OUAGx API key' }
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Force -Path $tempDir | Out-Null
Invoke-WebRequest -Uri $repoZip -UseBasicParsing -OutFile $tempZip
Expand-Archive -Path $tempZip -DestinationPath $tempDir -Force
$sourceDir = Get-ChildItem -Path $tempDir -Directory | Select-Object -First 1

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null
Get-ChildItem -Path $sourceDir.FullName -Force | Copy-Item -Destination $InstallDir -Recurse -Force
Remove-Item $tempZip -Force
Remove-Item $tempDir -Recurse -Force

Push-Location $InstallDir
try {
  npm.cmd install
} finally {
  Pop-Location
}

$launcher = Join-Path $InstallDir 'ouagx-project.cmd'
$launcherBody = @"
@echo off
cd /d "$InstallDir"
set "OUAGX_API_URL=$ApiUrl"
set "OUAGX_API_KEY=$ApiKey"
set "OUAGX_PROVIDER=$Provider"
set "OUAGX_MODEL=$Model"
npm.cmd run terminal -- --provider %OUAGX_PROVIDER% --api-url %OUAGX_API_URL% --api-key %OUAGX_API_KEY% --model %OUAGX_MODEL%
pause
"@
Set-Content -Path $launcher -Encoding ascii -Value $launcherBody.Trim()

Write-Host "OUAGx project CLI installed to $InstallDir" -ForegroundColor Green
Write-Host "Run: $launcher" -ForegroundColor Cyan
