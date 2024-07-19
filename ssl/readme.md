[OpenSSL](https://github.com/openssl/openssl) WebServer [HTTPS]
#### self-signed certificate (HTTPS) with OpenSSL 
```bash
sudo apt install openssl nginx -y
sudo mkdir /etc/nginx/ssl
```

```bash
git clone https://github.com/universalbit-dev/HArmadillium/
cd ~/HArmadillium/ssl
openssl genrsa 2048 > host.key
chmod 400 host.key
openssl req -new -x509 -nodes -sha256 -days 365 -key host.key -out host.cert -config distinguished.cnf
sudo cp host.key host.cert /etc/nginx/ssl
```
