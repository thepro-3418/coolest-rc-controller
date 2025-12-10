def on_button_pressed_a():
    bluetooth.uart_write_string("F")
    basic.show_string("F")
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    bluetooth.uart_write_string("B")
    basic.show_string("B")
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_logo_touched():
    bluetooth.uart_write_string("S")
    basic.show_string("-")
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

bluetooth.start_uart_service()