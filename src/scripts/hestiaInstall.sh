#!/usr/bin/sh
# start docker;
# https://hestiacp.com/install.html
# DON'T FORGET TO FILL IN THE FIELD --email!


wget https://raw.githubusercontent.com/hestiacp/hestiacp/release/install/hst-install.sh
sudo ./hst-install.sh --port '8083' --lang 'en' --email '' --apache yes --phpfpm yes --multiphp yes --vsftpd yes --proftpd no --named yes --mariadb yes --mysql8 no --postgresql yes --exim yes --dovecot yes --sieve no --clamav yes --spamassassin yes --iptables yes --fail2ban yes --quota no --api yes --interactive yes --force no

exit 0