import pathlib
import os

with open(os.path.join(pathlib.Path.home(), '.aws', 'credentials'), 'w') as cred:
    cred.write('''
[default]
aws_access_key_id = YOUR_KEY
aws_secret_access_key = YOUR_SECRET
    ''')
with open(os.path.join(pathlib.Path.home(), '.aws', 'config'), 'w') as conf:
    conf.write('''
[default]
region=eu-west-1
    ''')
