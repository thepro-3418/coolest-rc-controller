bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.Heart)
})
// Button A: emergency stop -> send "S"
input.onButtonPressed(Button.A, function () {
    bluetooth.uartWriteString("S")
    basic.showIcon(IconNames.No)
    lastCmd = "S"
    basic.pause(300)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    bluetooth.uartWriteString("M")
    basic.showString("M")
    // treat as last so we don't immediately resend another cmd
    lastCmd = "M"
    basic.pause(400)
    basic.clearScreen()
})
let cmd = ""
let ay = 0
let ax = 0
let lastCmd = ""
bluetooth.startUartService()
basic.showString("BT")
// Constants for tilt thresholds (adjust if needed)
// larger = less sensitive
let THRESH = 300
// how often we check/send
let PAUSE_MS = 150
basic.forever(function () {
    // Read accelerometer
    ax = input.acceleration(Dimension.X)
    ay = input.acceleration(Dimension.Y)
    // Determine command based on tilt
    // default stop
    cmd = "S"
    if (ay < 0 - THRESH) {
        // forward (tilt front)
        cmd = "F"
        basic.showArrow(ArrowNames.North)
    } else if (ay > THRESH) {
        // backward (tilt back)
        cmd = "B"
        basic.showArrow(ArrowNames.South)
    } else if (ax < 0 - THRESH) {
        // left (tilt left)
        cmd = "L"
        basic.showArrow(ArrowNames.West)
    } else if (ax > THRESH) {
        // right (tilt right)
        cmd = "R"
        basic.showArrow(ArrowNames.East)
    } else {
        // neutral position
        basic.showLeds(`
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            `)
    }
    // Send only if changed (reduces spam)
    if (cmd != lastCmd) {
        bluetooth.uartWriteString(cmd)
        lastCmd = cmd
    }
    basic.pause(PAUSE_MS)
})
