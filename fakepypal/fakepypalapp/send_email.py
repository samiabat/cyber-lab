import smtplib

def sendEmail(message):
    smtp_server = "smtp.gmail.com"
    port = 587 
    sender_email = "***************"
    password = "*************"
    receiver_email = "**************"

    try:
        server = smtplib.SMTP(smtp_server,port)
        server.starttls() 
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
    except Exception as e:
        print(e)
    finally:
        server.quit()