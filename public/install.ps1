param(
  [string]$InstallDir = (Join-Path $HOME 'OUAGx'),
  [switch]$AddToPath
)

$ErrorActionPreference = 'Stop'
$source = 'https://ouagx.com/ouagx.ps1'
$fallbackSource = 'https://raw.githubusercontent.com/ouagme/agentfluxa/main/public/ouagx.ps1'
$target = Join-Path $InstallDir 'ouagx.ps1'

New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

try {
  [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
} catch {
  # TLS is already configured on newer PowerShell versions.
}

function Download-Client([string]$uri, [string]$destination) {
  Invoke-WebRequest -Uri $uri -UseBasicParsing -OutFile $destination
  $content = Get-Content -Raw -Path $destination
  if ($content -notmatch 'OUAGx PowerShell client') {
    throw "The downloaded file from $uri was not the OUAGx client."
  }
}

try {
  Download-Client $source $target
} catch {
  Write-Host "The OUAGx domain installer is unavailable. Using the GitHub source..." -ForegroundColor Yellow
  Download-Client $fallbackSource $target
}

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
