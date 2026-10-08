Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourceDirectory = Join-Path $projectRoot 'public\vehicles'
$outputDirectory = Join-Path $projectRoot 'public\patterns'
$tileSize = 1024
$cellSize = 128
$iconSize = 88

New-Item -ItemType Directory -Force -Path $outputDirectory | Out-Null

$vehicleFiles = @(
    'light-tank.png',
    'heavy-tank.png',
    'artillery.png',
    'armored-car.png',
    'tank-destroyer.png'
)

$vehicles = $vehicleFiles | ForEach-Object {
    [System.Drawing.Image]::FromFile((Join-Path $sourceDirectory $_))
}

function New-ColorMatrix([bool]$invert) {
    if ($invert) {
        return [System.Drawing.Imaging.ColorMatrix]::new([single[][]]@(
            [single[]]@(-1, 0, 0, 0, 0),
            [single[]]@(0, -1, 0, 0, 0),
            [single[]]@(0, 0, -1, 0, 0),
            [single[]]@(0, 0, 0, 1, 0),
            [single[]]@(1, 1, 1, 0, 1)
        ))
    }

    return [System.Drawing.Imaging.ColorMatrix]::new()
}

function New-PatternTile([string]$fileName, [bool]$invert) {
    $bitmap = [System.Drawing.Bitmap]::new(
        $tileSize,
        $tileSize,
        [System.Drawing.Imaging.PixelFormat]::Format32bppArgb
    )
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $attributes = [System.Drawing.Imaging.ImageAttributes]::new()

    try {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $attributes.SetColorMatrix((New-ColorMatrix $invert))

        for ($row = -1; $row -le 8; $row++) {
            $wrappedRow = (($row % 8) + 8) % 8
            $rowOffset = if ($wrappedRow % 2 -eq 0) { 0 } else { $cellSize / 2 }

            for ($column = -2; $column -le 8; $column++) {
                $wrappedColumn = (($column % 8) + 8) % 8
                $vehicleIndex = (($wrappedRow * 2 + $wrappedColumn) % $vehicles.Count)
                $mirrored = (($wrappedRow + $wrappedColumn) % 4) -eq 0
                $x = ($column * $cellSize) + $rowOffset
                $y = $row * $cellSize
                $state = $graphics.Save()

                try {
                    $graphics.TranslateTransform([single]$x, [single]$y)
                    $graphics.RotateTransform(-30)
                    if ($mirrored) { $graphics.ScaleTransform(-1, 1) }

                    $destination = [System.Drawing.Rectangle]::new(
                        -$iconSize / 2,
                        -$iconSize / 2,
                        $iconSize,
                        $iconSize
                    )
                    $graphics.DrawImage(
                        $vehicles[$vehicleIndex],
                        $destination,
                        0,
                        0,
                        $vehicles[$vehicleIndex].Width,
                        $vehicles[$vehicleIndex].Height,
                        [System.Drawing.GraphicsUnit]::Pixel,
                        $attributes
                    )
                }
                finally {
                    $graphics.Restore($state)
                }
            }
        }

        $bitmap.Save(
            (Join-Path $outputDirectory $fileName),
            [System.Drawing.Imaging.ImageFormat]::Png
        )
    }
    finally {
        $attributes.Dispose()
        $graphics.Dispose()
        $bitmap.Dispose()
    }
}

try {
    New-PatternTile 'vehicle-pattern-light.png' $false
    New-PatternTile 'vehicle-pattern-dark.png' $true
}
finally {
    $vehicles | ForEach-Object { $_.Dispose() }
}
