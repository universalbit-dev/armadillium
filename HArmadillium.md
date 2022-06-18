
[UniversalBit](https://universalbit.it/blockchain) OnceAgain



### HArmadillium     
Clustering Thin Client HP-T610 Gnu/Linux Debian 11 Bullseye.

Documentation:
* [HA](https://wiki.debian.org/Debian-HA) 
* [Debian-HA](https://wiki.debian.org/Debian-HA/ClustersFromScratch)
* [Cluster-Labs](https://clusterlabs.org/)

Useful Links:
* [Nginx HA](https://www.howtoforge.com/tutorial/how-to-set-up-nginx-high-availability-with-pacemaker-corosync-on-centos-7/)
* [High Availability](https://www.digitalocean.com/community/tutorials/how-to-create-a-high-availability-setup-with-corosync-pacemaker-and-reserved-ips-on-ubuntu-14-04)
* [Pacemaker](https://github.com/ClusterLabs/pacemaker)

-----

Hardware && Software: [Read](https://universalbit.it:3000/universalbit-blockchain/Armadillium)


Required Packages:

```
apt install corosync pacemaker pcs ufw nginx haveged heartbeat

```

*[NetWorkManager](https://wiki.debian.org/NetworkConfiguration)
*[Hosts](https://wiki.debian.org/Hostname)
*[SSH](https://wiki.debian.org/SSH)
*[Corosync,PCS,PaceMaker](https://wiki.debian.org/Debian-HA/ClustersFromScratch)
*[UFW](https://wiki.debian.org/Uncomplicated%20Firewall%20(ufw))

<image><schema>

#### Setup Hosts File for all node.

```
nano /etc/hosts
```

```
127.0.0.1    localhost.localdomain localhost
127.0.1.1    localdomain.domain localdomain
10.0.2.144   armadillium01
10.0.2.145   armadillium02
10.0.2.146   armadillium03
10.0.2.147   armadillium04
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
```


##### SSH
connect to each node via terminal commands:
example:
```
ssh armadillium01@192.168.1.144
```


##### High Availability
<image><schema>

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


#####Corosync-keygen Authorize

armadillium01:
```
sudo corosync-keygen
sudo scp /etc/corosync/authkey armadillium02@192.168.1.145:/tmp
sudo scp /etc/corosync/authkey armadillium03@192.168.1.146:/tmp
sudo scp /etc/corosync/authkey armadillium04@192.168.1.147:/tmp
```


armadillium02:
```
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```


armadillium03:
```
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```


armadillium04:
```

sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```


##### Create the pcmk file
create pcmk file for all nodes:
```
sudo mkdir /etc/corosync/service.d
sudo nano /etc/corosync/service.d/pcmk
```


//add this lines
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


##### PCS Setup Cluster
```
sudo pcs cluster setup HArmadillium armadillium01 armadillium02 armadillium03 armadillium04
sudo pcs cluster start --all
```
Disable STONITH 
```
pcs property set stonith-enabled=false
```

Ignore Quorum policy
```
pcs property set no-quorum-policy=ignore
```
##### PCS Create Resources:

[WebServer Permissions](https://),[Nginx Reverse Proxy](https://),[Floating IP](https://)

WebServer:
```
sudo pcs resource create webserver ocf:heartbeat:nginx configfile=/etc/nginx/nginx.conf op monitor timeout="5s" interval="5s"
```
Nignx Reverse Proxy:
```
```

Floating IP:
```
sudo pcs resource create virtual_ip ocf:heartbeat:IPaddr2 ip=192.168.1.143 cidr_netmask=32 op monitor interval=30s
```

##### Constraint:
```
sudo pcs constraint colocation add webserver with virtual_ip INFINITY
```

```
sudo pcs constraint order webserver then virtual_ip
```



#### Authorize Host:
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

connect via ssh to armadillium03 and start pcsd service
```
sudo service pcsd start
```
```
sudo pcs cluster status
```
PCSD Status:
  * armadillium03: Online
  * armadillium04: Online
  * armadillium02: Online
  * armadillium01: Online


##### PaceMaker [>](https://packages.debian.org/sid/pacemaker)cluster resource manager:

-Description:
At its core, Pacemaker is a distributed finite state machine capable of co-ordinating the startup and recovery of inter-related services across a set of machines.

Pacemaker understands many different resource types (OCF, SYSV, systemd) and can accurately model the relationships between them (colocation, ordering).



##### run pacemaker after corosync service.
```
sudo update-rc.d pacemaker defaults 20 01
```

##### ufw [>](https://packages.debian.org/sid/ufw)program for managing a Netfilter firewall

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
Cluster Properties:
cluster-infrastructure: corosync
cluster-name: HArmadillium
dc-version: 2.0.5
have-watchdog: false
no-quorum-policy: ignore
stonith-enabled: false
   
   
##### ThinClient Setup:[Armadillium](https://universalbit.it:3000/universalbit-blockchain/Armadillium/src/master/README.md)

