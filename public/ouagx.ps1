param(
  [string]$ApiUrl = $env:OUAGX_API_URL,
  [string]$ApiKey = $env:OUAGX_API_KEY,
  [string]$Provider = $env:OUAGX_PROVIDER,
  [string]$Model = $env:OUAGX_MODEL
)

$ErrorActionPreference = 'Stop'
if (-not $ApiUrl) { $ApiUrl = 'https://www.ouagx.com/api' }

function Get-DefaultModel([string]$provider) {
  if ($provider -eq 'openai') { return 'gpt-4.1-mini' }
  if ($provider -eq 'gemini') { return 'gemini-2.5-flash' }
  if ($provider -eq 'custom') { return 'your-model-name' }
  return 'openai/gpt-4.1-mini'
}

function Get-ModelChoices([string]$provider) {
  if ($provider -eq 'openai') { return @('gpt-4.1-mini', 'gpt-4.1', 'o4-mini') }
  if ($provider -eq 'gemini') { return @('gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.0-flash') }
  if ($provider -eq 'openrouter') { return @('openai/gpt-4.1-mini', 'google/gemini-2.5-flash', 'anthropic/claude-sonnet-4') }
  return @()
}

if (-not $Provider) {
  Write-Host 'Choose the model provider connected through the OUAGx online API:' -ForegroundColor Cyan
  Write-Host '  1) OpenRouter'
  Write-Host '  2) OpenAI'
  Write-Host '  3) Google Gemini'
  Write-Host '  4) Custom OpenAI-compatible API'
  $providerChoice = Read-Host 'Provider [1]'
  $Provider = switch ($providerChoice) {
    '2' { 'openai' }
    '3' { 'gemini' }
    '4' { 'custom' }
    default { 'openrouter' }
  }
}

if (-not $Model) {
  $choices = Get-ModelChoices $Provider
  $defaultModel = Get-DefaultModel $Provider
  if ($choices.Count -gt 0) {
    Write-Host "Available $Provider models:" -ForegroundColor Cyan
    for ($index = 0; $index -lt $choices.Count; $index += 1) { Write-Host "  $($index + 1)) $($choices[$index])" }
    $modelChoice = Read-Host "Model [$defaultModel]"
    $Model = if ($modelChoice -match '^[1-9][0-9]*$' -and [int]$modelChoice -le $choices.Count) { $choices[[int]$modelChoice - 1] } elseif ($modelChoice) { $modelChoice } else { $defaultModel }
  } else {
    $Model = (Read-Host "Model [$defaultModel]").Trim()
    if (-not $Model) { $Model = $defaultModel }
  }
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
