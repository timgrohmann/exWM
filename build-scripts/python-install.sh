#!/bin/sh
cd /home/ubuntu/python-backend
pip3 install -r requirements.txt
# start server here
sudo systemctl restart exwm.uwsgi.service