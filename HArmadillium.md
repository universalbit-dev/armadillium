* [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)
* [Disambiguation](https://en.wikipedia.org/wiki/Wikipedia:Disambiguation)
* [ThinClient] Setup:[Armadillium](https://github.com/universalbit-dev/armadillium)
<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/docs/assets/images/ecosystem_gran_canaria_edited.png" width="auto" />

---

## [Introduction to High Availability](https://ubuntu.com/server/docs/introduction-to-high-availability)

### HArmadillium 
Hardware:
* [HP-T610 Thin Client Product Specifications](https://support.hp.com/us-en/document/c03235347) 
* [HP-T630 Thin Client Product Specifications](https://support.hp.com/us-en/document/c05240287) 

Required:Check ubuntu repository are enabled
#[Ubuntu 24.04 LTS Noble] 
<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/images/software_repositories.png" width="auto"></img>


### Hardware Wiring []

<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/images/HArmadillium.jpg" width="auto" />

note: [ipfire](https://github.com/universalbit-dev/universalbit-dev/blob/main/ipfire/readme.md)

---
---
### [Python3](https://www.python.org/) 
Note:

--Deadsnakes PPA has already updated its support for Ubuntu 24.04 (Noble)
```bash
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.11
```

OR Download and Compile Python3 from source: [Compiling Software](https://help.ubuntu.com/community/CompilingSoftware)
[Python3](https://www.python.org/downloads/)
```bash
./configure
make
make test
sudo make install
```




### High Availability Required Packages:

```bash
#[Ubuntu 24.04 LTS Noble]
sudo apt install corosync pacemaker fence-agents crmsh pcs* cluster-glue ufw nginx haveged heartbeat
```
---

###### Overview:
* [Host setup](#Host)
* [SSH connections](#SSH)
* [Corosync](#Corosync)
* [PCMK file](#PCMK)
* [CRM](#CRM)
* [PCS Setup](#PCS)
* [WebServer](#WebServer)
* [PaceMaker](#PaceMaker)
* [Firewall UFW](#UFW)

Getting <strong>Wiki</strong>:
* [Corosync-PCS-PaceMaker](https://wiki.debian.org/Debian-HA/ClustersFromScratch)



## Host
* edit host file <strong>TO</strong> each node
```bash
sudo nano /etc/hosts
```
```bash
#armadillium01 #armadillium02 #armadillium03 #armadillium04
192.168.1.141
192.168.1.142
192.168.1.143
192.168.1.144
#
127.0.0.1          localhost
127.0.1.1          armadillium01.universalbit armadillium01
# local-ip-address machinename
```
* ##### [armadillium01]() host setup
* ##### [armadillium02]() host setup
* ##### [armadillium03]() host setup
* ##### [armadillium04]() host setup

---
## SSH
##### SSH connection to communicate with all nodes
Install required packages <srong>TO</strong> each node and <strong>Check ubuntu repository are enabled</strong>
* <strong>FROM</strong> armadillium01 <strong>TO</strong> armadillium02
```bash
ssh armadillium02@192.168.1.142
sudo apt install corosync pacemaker fence-agents crmsh pcs* cluster-glue ufw nginx haveged heartbeat
```
* ssh connect <strong>TO</strong> armadillium03
```bash
ssh armadillium03@192.168.1.143
sudo apt install corosync pacemaker fence-agents crmsh pcs* cluster-glue ufw nginx haveged heartbeat
```
* ssh connect <strong>TO</strong> armadillium04
```bash
ssh armadillium04@192.168.1.144
sudo apt install corosync pacemaker fence-agents crmsh pcs* cluster-glue ufw nginx haveged heartbeat
```
---
---

#### High Availability
## Corosync
* [Corosync](https://packages.debian.org/sid/corosync) cluster engine daemon and utilities
##### The Corosync Cluster Engine is a Group Communication System with additional features for implementing high availability within applications. 
##### The project provides four C Application Programming Interface features:

 * A closed process group communication model with virtual synchrony
   guarantees for creating replicated state machines.
 * A simple availability manager that restarts the application process
   when it has failed.
 * A configuration and statistics in-memory database that provide the
   ability to set, retrieve, and receive change notifications of
   information.
 * A quorum system that notifies applications when quorum is achieved
   or lost.

#### Corosync Configuration File: repeat this TO each node
```bash
sudo nano /etc/corosync/corosync.conf
```
corosync configuration file:
```bash
totem {
  version: 2
  cluster_name: HArmadillium
  transport: udpu
  interface {
   ringnumber: 0
   bindnetaddr: 192.168.1.140
   broadcast: yes
   mcastport: 5405
 }
}
nodelist {
  node {
    ring0_addr: 192.168.1.141
    name: armadillium01
    nodeid: 1
  }
  node {
    ring0_addr: 192.168.1.142
    name: armadillium02
    nodeid: 2
  }
  node {
    ring0_addr: 192.168.1.143
    name: armadillium03
    nodeid: 3
  }
  node {
    ring0_addr: 192.168.1.144
    name: armadillium04
    nodeid: 4
  }
}
logging {
  to_logfile: yes
  logfile: /var/log/corosync/corosync.log
  to_syslog: yes
  timestamp: on
}
service {
  name: pacemaker
  ver: 1
}
```
---
---
#### Corosync-keygen Authorize

* FROM armadillium01 create corosync key :
```bash
#armadillium01 
sudo corosync-keygen
```
* secure copy (ssh) authkey FROM armadillium01 TO each node : /tmp directory 
```bash
sudo scp /etc/corosync/authkey armadillium02@192.168.1.142:/tmp #02
sudo scp /etc/corosync/authkey armadillium03@192.168.1.143:/tmp #03
sudo scp /etc/corosync/authkey armadillium04@192.168.1.144:/tmp #04
```
<strong>FROM</strong> armadillium01
* connect <strong>TO</strong> armadillium02 and move authkey <strong>FROM</strong> /tmp directory <strong>TO</strong> /etc/corosync directory
```bash
ssh armadillium02@192.168.1.142
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```
* connect <strong>TO</strong> armadillium03 and move authkey <strong>FROM</strong> /tmp directory <strong>TO</strong> /etc/corosync directory
```bash
ssh armadillium03@192.168.1.143
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```
* connect TO <strong>armadillium04</strong> and move authkey <strong>FROM</strong> /tmp directory <strong>TO</strong> /etc/corosync directory
```bash
ssh armadillium04@192.168.1.144
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```
---
---
## CRM Consider this configuration tool as an alternative to the PCS.
## [Cluster Setup](https://crmsh.github.io/start-guide/)
--

## PCS
* [PCS](https://packages.debian.org/buster/pcs) Pacemaker Configuration System
-Description:
pcs is a corosync and pacemaker configuration tool. It permits users to easily view, modify and create pacemaker based clusters.
pcs also provides pcsd, which operates as a GUI and remote server for PCS.
Together PCS and PCSD form the recommended configuration tool for use with pacemaker.

* ##### PCS Setup Cluster : TO each node
```bash
sudo pcs cluster setup HArmadillium armadillium01 armadillium02 armadillium03 armadillium04
sudo pcs cluster start --all
```
* ##### Disable STONITH 
```bash
pcs property set stonith-enabled=false
```
* ##### Ignore Quorum policy
```bash
pcs property set no-quorum-policy=ignore
```
* ##### [PCS Create Resources](https://www.golinuxcloud.com/create-cluster-resource-in-ha-cluster-examples/): TO each node
* ##### Create WebServer Resource TO each node
```bash
### [under review]sudo pcs resource create webserver ocf:heartbeat:nginx configfile=/etc/nginx/nginx.conf op monitor timeout="5s" interval="5s"
crm configure primitive webserver ocf:heartbeat:nginx configfile=/etc/nginx/nginx.conf op start timeout="40s" interval="0" op stop timeout="60s" interval="0" op monitor interval="10s" timeout="60s" meta migration-threshold="10"
```
### ClusterLabs [Resource Agents](https://github.com/ClusterLabs/resource-agents)

* ##### [PCS Create Resources](https://www.golinuxcloud.com/create-cluster-resource-in-ha-cluster-examples/): TO each node
* ##### Create PCSFloating IP Resource: TO each node
```bash
sudo pcs resource create virtual_ip ocf:heartbeat:IPaddr2 ip=192.168.1.140 cidr_netmask=32 op monitor interval=30s
#crm configure primitive virtual_ip ocf:heartbeat:IPaddr2 params ip="192.168.1.140" cidr_netmask="32" op monitor interval="10s" meta migration-threshold="10"
```
##### Constraint: TO each node
```bash
sudo pcs constraint colocation add webserver with virtual_ip INFINITY
```

```bash
sudo pcs constraint order webserver then virtual_ip
```

#### PCS AUTH authorize host(TO each node)
FROM armadillium01:
```bash
sudo pcs host auth armadillium02
sudo pcs host auth armadillium03
sudo pcs host auth armadillium04
```
* user:     hacluster 
* password: use same password to each node

note:
* user hacluster auto created when install pcs package.

* ##### Start PCS (TO each node)
```bash
sudo pcs cluster start --all
sudo pcs cluster enable --all
```
## PCMK
* ##### Create PCMK file  : TO each node
```bash 
sudo mkdir /etc/corosync/service.d
sudo nano /etc/corosync/service.d/pcmk
```
* ##### add this
```bash
service {
  name: pacemaker
  ver: 1
}
```
---
## Webserver
* ##### Nginx as Reverse Proxy
create ssl certificate TO each node
```bash
sudo apt install nginx -y
```
* ##### [HTTPS](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-22-04)
TO each node:
```bash
sudo apt install openssl
```
* create self-signed certificate:
```bash
openssl genrsa 2048 > host.key
chmod 400 host.key
openssl req -new -x509 -nodes -sha256 -days 365 -key host.key -out host.cert -config distinguished.cnf
cp host.cert /etc/nginx/ssl/
cp host.key  /etc/nginx/ssl/
```

* edit the Nginx default file 
```bash
nano /etc/nginx/sites-enabled/default
```
* armadillium01 nginx configuration file:
```bash
server {
listen 80;
listen [::]:80;
server_name 192.168.1.141;
return 301 https://$server_name$request_uri;
}

server {
    server_name 192.168.1.141;
    listen 8001;
    return 301 https://$host$request_uri;
    }
    
upstream websocket {
    server 192.168.1.141;
    server 192.168.1.142;
    server 192.168.1.143;
    server 192.168.1.144;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name 192.168.1.141;
    root /usr/share/nginx/html;
    ssl_certificate /etc/nginx/ssl/host.cert;
    ssl_certificate_key /etc/nginx/ssl/host.key;    

    location / {
            proxy_buffers 8 32k;
            proxy_buffer_size 64k;
            proxy_pass http://websocket;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-NginX-Proxy true;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_read_timeout 86400s;
            proxy_send_timeout 86400s;
    }
}
```
#### WebServer Resources
* ### [Nginx configuration files](https://github.com/universalbit-dev/HArmadillium/tree/main/nginx)
  * [01](https://github.com/universalbit-dev/HArmadillium/blob/main/nginx/01/default)
  * [02](https://github.com/universalbit-dev/HArmadillium/blob/main/nginx/02/default)
  * [03](https://github.com/universalbit-dev/HArmadillium/blob/main/nginx/03/default)
  * [04](https://github.com/universalbit-dev/HArmadillium/blob/main/nginx/03/default)
---

---

* ##### Throubleshooter:
```
**Error
Warning: Unable to read the known-hosts file: No such file or directory: '/var/lib/pcsd/known-hosts'
armadillium03: Unable to authenticate to armadillium03 - (HTTP error: 401)...
armadillium01: Unable to authenticate to armadillium01 - (HTTP error: 401)...
armadillium04: Unable to authenticate to armadillium04 - (HTTP error: 401)...
armadillium02: Unable to authenticate to armadillium02 - (HTTP error: 401)...
```

* ##### cause: PCSD service not started
* ##### fix: Start PCSD service TO each node
```bash
ssh armadillium02@10.0.2.142
sudo service pcsd start
sudo service pcsd status
```

* ##### PCSD Status:
```bash
sudo pcs cluster status
```
```bash
  * armadillium03: Online
  * armadillium04: Online
  * armadillium02: Online
  * armadillium01: Online
```
---
---
## Pacemaker
## Cluster Resource Manager:
-Description:
Pacemaker is a distributed finite state machine capable of co-ordinating the startup and recovery of inter-related services across a set of machines.
Pacemaker understands many different resource types (OCF, SYSV, systemd) and can accurately model the relationships between them (colocation, ordering).

##### Run Pacemaker after corosync service: TO each node
```bash
sudo update-rc.d pacemaker defaults 20 01
```
---
---
## UFW
## Firewall Rules TO each node
-Description:
The Uncomplicated FireWall is a front-end for iptables, to make managing a Netfilter firewall easier. It provides a command line interface with syntax similar to OpenBSD's Packet Filter. It is particularly well-suited as a host-based firewall.

```bash
sudo ufw allow from 192.168.1.141
sudo ufw allow from 192.168.1.142
sudo ufw allow from 192.168.1.143
sudo ufw allow from 192.168.1.144
```

* ##### Property List TO each node
```bash
sudo pcs property list
```

##### Example Working Output: 
```bash
Cluster Properties:
cluster-infrastructure: corosync
cluster-name: HArmadillium
dc-version: 2.0.5
have-watchdog: false
no-quorum-policy: ignore
stonith-enabled: false
```
##### HACluster configured and ready to host something of amazing
---
---

Resources:
* [HA](https://wiki.debian.org/Debian-HA) 
* [Debian-HA](https://wiki.debian.org/Debian-HA/ClustersFromScratch)
* [Cluster-Labs](https://clusterlabs.org/)
* [Nginx High Availability](https://www.howtoforge.com/tutorial/how-to-set-up-nginx-high-availability-with-pacemaker-corosync-and-crmsh-on-ubuntu-1604/)
* [High-availability-setup-with-corosync](https://www.digitalocean.com/community/tutorials/how-to-create-a-high-availability-setup-with-corosync-pacemaker-and-reserved-ips-on-ubuntu-14-04)
* [Apache as reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension-ubuntu-20-04)
* [Nginx HA](https://www.howtoforge.com/tutorial/how-to-set-up-nginx-high-availability-with-pacemaker-corosync-on-centos-7/)
* [High Availability](https://www.digitalocean.com/community/tutorials/how-to-create-a-high-availability-setup-with-corosync-pacemaker-and-reserved-ips-on-ubuntu-14-04)
* [Pacemaker](https://github.com/ClusterLabs/pacemaker)
* [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)
* [NetWorkManager](https://wiki.debian.org/NetworkConfiguration)
* [Hosts](https://wiki.debian.org/Hostname)
