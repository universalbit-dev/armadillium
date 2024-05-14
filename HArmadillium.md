##### [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)
##### [Disambiguation](https://en.wikipedia.org/wiki/Wikipedia:Disambiguation)

### ThinClient Setup:[Armadillium](https://github.com/universalbit-dev/armadillium)
<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/docs/assets/images/ecosystem_gran_canaria_edited.png" width="auto" />

* #####  also [mini pond](https://www.bbc.com/future/article/20240423-how-to-make-a-mini-wildlife-pond) is a good example

### HArmadillium     
* Clustering [Thin Client](https://en.wikipedia.org/wiki/Thin_client) [HP-T610]() Gnu/Linux Debian 11 [Bullseye](https://www.debian.org/releases/bullseye/).
* Clustering [Thin Client](https://en.wikipedia.org/wiki/Thin_client) [HP-T630]() Gnu/Linux Debian 12 [BookWorm](https://www.debian.org/releases/bookworm/).

---
### Debian/Ubuntu:
##### [Debian 11 Minimal Server](https://www.howtoforge.com/tutorial/debian-11-bullseye-minimal-server/)
##### [Debian 12 Minimal Server](https://www.howtoforge.com/tutorial/debian-minimal-server/)
##### [Ubuntu 24.04 LTS](https://ubuntu.com/download/desktop)
-----
* Required Packages:

```bash
apt install corosync pacemaker pcs ufw apache2 nginx haveged heartbeat
```
[heartbeat](https://www.digitalocean.com/community/tutorials/how-to-create-a-high-availability-setup-with-heartbeat-and-reserved-ips-on-ubuntu-16-04)

* [Corosync,PCS,PaceMaker](https://wiki.debian.org/Debian-HA/ClustersFromScratch)

* edit host file on each node
```bash
sudo nano /etc/hosts
```

* ##### example01 [armadillium01](https://github.com/universalbit-dev/HArmadillium) host setup
```
#
192.168.1.144      armadillium01
192.168.1.145      armadillium02
192.168.1.146      armadillium03
192.168.1.147      armadillium04
127.0.0.1          localhost
127.0.1.1          armadillium01.universalbit armadillium01
# local-ip-address machinename
```

* ##### example02 [armadillium02](https://github.com/universalbit-dev/HArmadillium) host setup
```
#
192.168.1.144      armadillium01
192.168.1.145      armadillium02
192.168.1.146      armadillium03
192.168.1.147      armadillium04
127.0.0.1          localhost
127.0.1.1          armadillium02.universalbit armadillium02
# local-ip-address machinename
```

* ##### example03 [armadillium03](https://github.com/universalbit-dev/HArmadillium) host setup
```
#
192.168.1.144      armadillium01
192.168.1.145      armadillium02
192.168.1.146      armadillium03
192.168.1.147      armadillium04
127.0.0.1          localhost
127.0.1.1          armadillium03.universalbit armadillium03
# local-ip-address machinename
```

* ##### example04 [armadillium04](https://github.com/universalbit-dev/HArmadillium) host setup
```
#
192.168.1.144      armadillium01
192.168.1.145      armadillium02
192.168.1.146      armadillium03
192.168.1.147      armadillium04
127.0.0.1          localhost
127.0.1.1          armadillium04.universalbit armadillium04
# local-ip-address machinename
```


##### SSH
connect to each node via terminal commands:
example:
```bash
ssh armadillium01@192.168.1.144
```

##### High Availability

* [Corosync](https://packages.debian.org/sid/corosync)
cluster engine daemon and utilities

##### The Corosync Cluster Engine is a Group Communication System with additional features for implementing high availability within applications. The project provides four C Application Programming Interface features:

 * A closed process group communication model with virtual synchrony
   guarantees for creating replicated state machines.
 * A simple availability manager that restarts the application process
   when it has failed.
 * A configuration and statistics in-memory database that provide the
   ability to set, retrieve, and receive change notifications of
   information.
 * A quorum system that notifies applications when quorum is achieved
   or lost.

##### Corosync Configuration File:

```bash
nano /etc/corosync/corosync.conf
```

```bash
totem {
  version: 2
  cluster_name: HArmadillium
  transport: udpu
  interface {
   ringnumber: 0
   bindnetaddr: 192.168.1.143
   broadcast: yes
   mcastport: 5405
 }
}
nodelist {
  node {
    ring0_addr: 192.168.1.144
    name: armadillium01
    nodeid: 1
  }
  node {
    ring0_addr: 192.168.1.145
    name: armadillium02
    nodeid: 2
  }
  node {
    ring0_addr: 192.168.1.146
    name: armadillium03
    nodeid: 3
  }
  node {
    ring0_addr: 192.168.1.147
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
```

* ##### Corosync-keygen Authorize

  ##### armadillium01 : create corosync-keygen and secure copy corosync keygen to other nodes
         * scp keygen to armadillium02
         * scp keygen to armadillium03
         * scp keugen to armadillium04

* armadillium01:
```bash
sudo corosync-keygen #armadillium01 key generate
sudo scp /etc/corosync/authkey armadillium02@192.168.1.145:/tmp #armadillium02 copy keygen to node02
sudo scp /etc/corosync/authkey armadillium03@192.168.1.146:/tmp #armadillium03 copy keygen to node03
sudo scp /etc/corosync/authkey armadillium04@192.168.1.147:/tmp #armadillium04 copy keygen to node04
```

* armadillium02:
```bash
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

* armadillium03:
```bash
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

* armadillium04:
```bash
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

* ##### Create the pcmk file
create pcmk file for all nodes:
```bash 
sudo mkdir /etc/corosync/service.d
sudo nano /etc/corosync/service.d/pcmk
```

* ##### add this lines of code
```bash
service {
  name: pacemaker
  ver: 1
}
```

* [PCS](https://packages.debian.org/buster/pcs)
Pacemaker Configuration System
-Description:
pcs is a corosync and pacemaker configuration tool. It permits users to easily view, modify and create pacemaker based clusters.

pcs also provides pcsd, which operates as a GUI and remote server for pcs. Together pcs and pcsd form the recommended configuration tool for use with pacemaker.

* ##### PCS Setup Cluster
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
---

##### [PCS Create Resources](https://www.golinuxcloud.com/create-cluster-resource-in-ha-cluster-examples/):
* ##### Create WebServer Resource
```bash
sudo pcs resource create webserver ocf:heartbeat:nginx configfile=/etc/nginx/nginx.conf op monitor timeout="5s" interval="5s"
```
* Nginx as Reverse Proxy
```bash
apt-get install nginx -y
```

* [Nginx SSL](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-22-04)

---


* edit the Nginx default file:
```bash
nano /etc/nginx/sites-enabled/default
```
```bash
server {
listen 80;
listen [::]:80;
server_name 192.168.1.144;
return 301 https://$server_name$request_uri;
}

server {
    server_name 192.168.1.144;
    listen 8001;
    return 301 https://$host$request_uri;
    }
    
upstream websocket {
    server 192.168.1.144; #01
    server 192.168.1.145; #02
    server 192.168.1.146; #03
    server 192.168.1.147; #04
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name 192.168.1.144;
    root /usr/share/nginx/html;
    ssl_certificate /etc/nginx/ssl/nginx.crt;
    ssl_certificate_key /etc/nginx/ssl/nginx.key;    

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
---
##### Note:
* [Apache2 SSL](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-20-04)
* [Nginx as reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-reverse-proxy-on-ubuntu-22-04)
* [Apache2 as reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension-ubuntu-20-04)
---


* Floating IP:
```bash
sudo pcs resource create virtual_ip ocf:heartbeat:IPaddr2 ip=192.168.1.143 cidr_netmask=32 op monitor interval=30s
```

##### Constraint:
```bash
sudo pcs constraint colocation add webserver with virtual_ip INFINITY
```

```bash
sudo pcs constraint order webserver then virtual_ip
```



#### Authorize Host: 
Repeat this for all nodes(armadillium01,armadillium02,armadillium03,armadilliumN)

Auth hosts with user hacluster and unified password for all nodes.

note: **Info
user hacluster auto created when install pcs package.

Auth node to known-hosts,repeat for all nodes
```bash
sudo pcs host auth armadillium03
```

username: hacluster
password: same-password-for-all-nodes

##### Repeat this command for all nodes (armadillium01,armadillium02,armadilliumN)
```bash
pcs host auth armadillium03
```

```bash
sudo pcs cluster start --all
```
##### ...
```bash
armadillium03: Starting Cluster...
armadillium04: Starting Cluster...
armadillium01: Starting Cluster...
armadillium02: Starting Cluster...
```


```bash
sudo pcs cluster enable --all
```
```
note: **Error
Warning: Unable to read the known-hosts file: No such file or directory: '/var/lib/pcsd/known-hosts'
armadillium03: Unable to authenticate to armadillium03 - (HTTP error: 401)...
armadillium01: Unable to authenticate to armadillium01 - (HTTP error: 401)...
armadillium04: Unable to authenticate to armadillium04 - (HTTP error: 401)...
armadillium02: Unable to authenticate to armadillium02 - (HTTP error: 401)...
```

* ##### connect via ssh to armadillium03 and start pcsd service and repeat this for all nodes.
```bash
sudo service pcsd start
```

* PCSD Status:
```bash
sudo pcs cluster status
```
```bash
  * armadillium03: Online
  * armadillium04: Online
  * armadillium02: Online
  * armadillium01: Online
```

##### [PaceMaker](https://packages.debian.org/sid/pacemaker) cluster resource manager:
-Description:
At its core, Pacemaker is a distributed finite state machine capable of co-ordinating the startup and recovery of inter-related services across a set of machines.

Pacemaker understands many different resource types (OCF, SYSV, systemd) and can accurately model the relationships between them (colocation, ordering).

##### run pacemaker after corosync service.
```bash
sudo update-rc.d pacemaker defaults 20 01
```

##### [UFW](https://packages.debian.org/sid/ufw) Firewall
-Description:
The Uncomplicated FireWall is a front-end for iptables, to make managing a Netfilter firewall easier. It provides a command line interface with syntax similar to OpenBSD's Packet Filter. It is particularly well-suited as a host-based firewall.

Enable corosync,pacemaker and pcs traffic.

* Firewall Rules:
```bash
ufw default allow outgoing
```

* ##### Enable HA local area network :LAN [corosync pacemaker and pcs]
```bash
sudo ufw allow from 192.168.1.144
sudo ufw allow from 192.168.1.145
sudo ufw allow from 192.168.1.146
sudo ufw allow from 192.168.1.147
```

* ##### Property List
```bash
sudo pcs property list
```

##### example terminal output 
```bash
Cluster Properties:
cluster-infrastructure: corosync
cluster-name: HArmadillium
dc-version: 2.0.5
have-watchdog: false
no-quorum-policy: ignore
stonith-enabled: false
```

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

