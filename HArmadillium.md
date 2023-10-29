##### ThinClient Setup:[Armadillium](https://github.com/universalbit-dev/armadillium)

### HArmadillium     
Clustering [Thin Client](https://en.wikipedia.org/wiki/Thin_client) HP-T610 Gnu/Linux Debian 11 Bullseye.
-----
* Required Packages:

```
apt install corosync pacemaker pcs ufw apache2 nginx haveged heartbeat
```
* [NetWorkManager](https://wiki.debian.org/NetworkConfiguration)
* [Hosts](https://wiki.debian.org/Hostname)
* [Corosync,PCS,PaceMaker](https://wiki.debian.org/Debian-HA/ClustersFromScratch)

#### Setup Hosts File for all node.
```
sudo nano /etc/hosts
```
* ##### example [armadillium01](https://github.com/universalbit-dev/HArmadillium) host setup
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


##### SSH
connect to each node via terminal commands:
example:
```
ssh armadillium01@192.168.1.144
```


##### High Availability

* [Corosync](https://packages.debian.org/sid/corosync)
cluster engine daemon and utilities

-Description:
The Corosync Cluster Engine is a Group Communication System with additional features for implementing high availability within applications. The project provides four C Application Programming Interface features:

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

```
nano /etc/corosync/corosync.conf
```

```
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

* armadillium01:
```
sudo corosync-keygen
sudo scp /etc/corosync/authkey armadillium02@192.168.1.145:/tmp
sudo scp /etc/corosync/authkey armadillium03@192.168.1.146:/tmp
sudo scp /etc/corosync/authkey armadillium04@192.168.1.147:/tmp
```

* armadillium02:
```
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

* armadillium03:
```
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

* armadillium04:
```
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

* ##### Create the pcmk file
create pcmk file for all nodes:
```
sudo mkdir /etc/corosync/service.d
sudo nano /etc/corosync/service.d/pcmk
```

* ##### add this lines of code
```
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

* ##### PCS Setup Cluster[?]()
```
sudo pcs cluster setup HArmadillium armadillium01 armadillium02 armadillium03 armadillium04
sudo pcs cluster start --all
```
* Disable STONITH 
```
pcs property set stonith-enabled=false
```

* Ignore Quorum policy[?]()
```
pcs property set no-quorum-policy=ignore
```
##### PCS Create Resources:

* [WebServer Permissions](https://)
* [Nginx Reverse Proxy](https://)
* [Floating IP](https://)

WebServer:
```
sudo pcs resource create webserver ocf:heartbeat:nginx configfile=/etc/nginx/nginx.conf op monitor timeout="5s" interval="5s"
```

* Nginx as Reverse Proxy
```
apt-get install nginx -y
```
edit the Nginx default file:
```
nano /etc/nginx/sites-enabled/default
```
```
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
* ##### Note:
* [Nginx as reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-as-a-reverse-proxy-on-ubuntu-22-04)
* [Apache2 as reverse proxy](https://www.digitalocean.com/community/tutorials/how-to-use-apache-http-server-as-reverse-proxy-using-mod_proxy-extension-ubuntu-20-04)
---
* [Nginx SSL](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-22-04)
* [Apache2 SSL](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-ubuntu-20-04)


* Floating IP:
```
sudo pcs resource create virtual_ip ocf:heartbeat:IPaddr2 ip=192.168.1.143 cidr_netmask=32 op monitor interval=30s
```

##### Constraint:[?]()
```
sudo pcs constraint colocation add webserver with virtual_ip INFINITY
```

```
sudo pcs constraint order webserver then virtual_ip
```



#### Authorize Host: [?]()
Repeat this for all nodes(armadillium01,armadillium02,armadillium03,armadilliumN)

Auth hosts with user hacluster and unified password for all nodes.

note: **Info
user hacluster auto created when install pcs package.

Auth node to known-hosts,repeat for all nodes
```
sudo pcs host auth armadillium03
```

username: hacluster
password: same-password-for-all-nodes

Repeat this command for all nodes (armadillium01,armadillium02,armadilliumN)
```
pcs host auth armadillium03
```


```
sudo pcs cluster start --all
```
armadillium03: Starting Cluster...
armadillium04: Starting Cluster...
armadillium01: Starting Cluster...
armadillium02: Starting Cluster...



```
sudo pcs cluster enable --all
```
note: **Error
Warning: Unable to read the known-hosts file: No such file or directory: '/var/lib/pcsd/known-hosts'
armadillium03: Unable to authenticate to armadillium03 - (HTTP error: 401)...
armadillium01: Unable to authenticate to armadillium01 - (HTTP error: 401)...
armadillium04: Unable to authenticate to armadillium04 - (HTTP error: 401)...
armadillium02: Unable to authenticate to armadillium02 - (HTTP error: 401)...

connect via ssh to armadillium03 and start pcsd service and repeat this for all nodes.
```
sudo service pcsd start
```

```
sudo pcs cluster status
```
PCSD Status: [?]()
  * armadillium03: Online
  * armadillium04: Online
  * armadillium02: Online
  * armadillium01: Online


##### [PaceMaker](https://packages.debian.org/sid/pacemaker) cluster resource manager: [?]()

-Description:
At its core, Pacemaker is a distributed finite state machine capable of co-ordinating the startup and recovery of inter-related services across a set of machines.

Pacemaker understands many different resource types (OCF, SYSV, systemd) and can accurately model the relationships between them (colocation, ordering).



##### run pacemaker after corosync service.
```
sudo update-rc.d pacemaker defaults 20 01
```

##### [UFW](https://packages.debian.org/sid/ufw) Firewall  [?]()

-Description:
The Uncomplicated FireWall is a front-end for iptables, to make managing a Netfilter firewall easier. It provides a command line interface with syntax similar to OpenBSD's Packet Filter. It is particularly well-suited as a host-based firewall.


Enable http/https traffic,corosync,pacemaker and pcs ports must be allowed.

```
sudo ufw allow http
sudo ufw allow https
```

Firewall Rules:

```
ufw default allow outgoing
```

allow nodes host ,enable corosync,pacemaker and pcs ports:

```
sudo ufw allow from 192.168.1.143
sudo ufw allow from 192.168.1.144
sudo ufw allow from 192.168.1.145
sudo ufw allow from 192.168.1.146
sudo ufw allow from 192.168.1.147
```

example:
```
sudo ufw allow 2224
```

pcs        port: 2224
pacemaker  port: 3121
corosync   port: 5403-5404-5405

```
sudo pcs property list
```
example terminal output 
```
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
* [Apache Hadoop](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/ClusterSetup.html)
* [High Availability](https://www.digitalocean.com/community/tutorials/how-to-create-a-high-availability-setup-with-corosync-pacemaker-and-reserved-ips-on-ubuntu-14-04)
* [Pacemaker](https://github.com/ClusterLabs/pacemaker)
[Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)


