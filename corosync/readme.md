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
#### corosync configuration file: armadillium01
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

#### corosync configuration file: armadillium02
```bash
ssh armadillium02@10.0.2.142
sudo nano /etc/corosync/corosync.conf
```
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

#### corosync configuration file: armadillium03
```bash
ssh armadillium03@10.0.2.143
sudo nano /etc/corosync/corosync.conf
```
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
#### corosync configuration file: armadillium04
```bash
ssh armadillium04@10.0.2.144
sudo nano /etc/corosync/corosync.conf
```
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
<strong>FROM</strong> armadillium01 <strong>TO</strong> armadillium02 and move authkey <strong>FROM</strong> /tmp directory <strong>TO</strong> /etc/corosync directory
```bash
ssh armadillium02@192.168.1.142
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

<strong>FROM</strong> armadillium01 <strong>TO</strong> armadillium03 and move authkey <strong>FROM</strong> /tmp directory <strong>TO</strong> /etc/corosync directory
```bash
ssh armadillium03@192.168.1.143
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

<strong>FROM</strong> armadillium01 <strong>TO</strong> armadillium04 and move authkey <strong>FROM</strong> /tmp directory <strong>TO</strong> /etc/corosync directory
```bash
ssh armadillium04@192.168.1.144
sudo mv /tmp/authkey /etc/corosync
sudo chown root: /etc/corosync/authkey
sudo chmod 400 /etc/corosync/authkey
```

