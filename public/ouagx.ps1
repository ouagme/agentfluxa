param(
  [string]$ApiUrl = $env:OUAGX_API_URL,
  [string]$ApiKey = $env:OUAGX_API_KEY,
  [string]$Provider = $env:OUAGX_PROVIDER,
  [string]$Model = $env:OUAGX_MODEL
)

$ErrorActionPreference = 'Stop'
if (-not $ApiUrl) { $ApiUrl = 'https://www.ouagx.com/api' }
if (-not $Provider) { $Provider = 'openrouter' }
if (-not $Model) {
  $Model = if ($Provider -eq 'gemini') { 'gemini-2.5-flash' } elseif ($Provider -eq 'openai') { 'gpt-4.1-mini' } else { 'openai/gpt-4.1-mini' }
}
if (-not $ApiKey) { $ApiKey = Read-Host 'Provider API key' }

$history = @()
Write-Host "OUAGx PowerShell client ($Provider / $Model)" -ForegroundColor Cyan
Write-Host 'Type exit to quit.'

while ($true) {
  $prompt = Read-Host 'OUAGx'
  if ($prompt.Trim().ToLower() -eq 'exit') { break }
  if (-not $prompt.Trim()) { continue }

  $history += @{ role = 'user'; content = $prompt }
  try {
    $payload = @{
      provider = $Provider
      model = $Model
      apiKey = $ApiKey
      messages = $history
    } | ConvertTo-Json -Depth 8

    $response = Invoke-RestMethod -Uri "$($ApiUrl.TrimEnd('/'))/chat" -Method Post -ContentType 'application/json' -Body $payload
    $answer = if ($response.result) { $response.result } else { $response.answer }
    Write-Host "`nOUAGx: $answer`n" -ForegroundColor Green
    $history += @{ role = 'assistant'; content = $answer }
  } catch {
    Write-Host "`nError: $($_.Exception.Message)`n" -ForegroundColor Red
  }
}
