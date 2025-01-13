import smtplib
import string
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from config import SENDER_EMAIL, SENDER_PASSWORD, EMAIL_SERVER, EMAIL_PORT, EMAIL_TIMEOUT
from logging_config import logger

def generate_random_password(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

def send_reset_email(user_email: str, new_password: str):
    # Send reset email
    subject = "Your New Password"
    body = f"Your new password is: {new_password}"

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = user_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(EMAIL_SERVER, EMAIL_PORT, timeout=EMAIL_TIMEOUT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, user_email, text)
        server.quit()
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False
