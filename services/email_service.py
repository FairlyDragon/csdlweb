import os
import smtplib
import string
import random
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from config import SENDER_EMAIL, SENDER_PASSWORD, EMAIL_SERVER, EMAIL_PORT, EMAIL_TIMEOUT
from logging_config import logger

def generate_random_password(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

def send_reset_email(user_email: str, new_password: str):
    # Send reset email
    subject = "Fairy Dragon Restaurant - Your New Password"
    body = f"Your new password is: {new_password}"

    msg = MIMEMultipart()
    msg['From'] = SENDER_EMAIL
    msg['To'] = user_email
    msg['Subject'] = subject

    try:
        # Try to attach the body with UTF-8 encoding
        msg.attach(MIMEText(body, 'plain', 'utf-8'))
        
        server = smtplib.SMTP(EMAIL_SERVER, EMAIL_PORT, timeout=EMAIL_TIMEOUT)
        server.starttls()
        server.login(SENDER_EMAIL, SENDER_PASSWORD)
        text = msg.as_string()
        server.sendmail(SENDER_EMAIL, user_email, text)
        server.quit()
        return True
    except Exception as e:
        logger.warning(f"Failed to send email with UTF-8 encoding: {str(e)}. Sending password as a file.")

        # Create a text file with the password
        file_name = "new_password.txt"
        with open(file_name, 'w') as f:
            f.write(f"Your new password is: {new_password}")

        # Create a new email message with the file attachment
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = user_email
        msg['Subject'] = subject

        # Attach the file to the email
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(open(file_name, 'rb').read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', f'attachment; filename="{file_name}"')
        msg.attach(part)

        try:
            server = smtplib.SMTP(EMAIL_SERVER, EMAIL_PORT, timeout=EMAIL_TIMEOUT)
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            text = msg.as_string()
            server.sendmail(SENDER_EMAIL, user_email, text)
            server.quit()

            # Delete the file after sending the email
            os.remove(file_name)
            return True
        except Exception as e:
            logger.error(f"Failed to send email with attachment: {str(e)}. Please try again or contact us via hotline at 028.1234.5678")
            return False