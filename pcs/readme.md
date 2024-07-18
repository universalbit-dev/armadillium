## PCS
* [PCS](https://packages.debian.org/buster/pcs) Pacemaker Configuration System
  
-Description:
It permits users to easily view, modify and create pacemaker based clusters.
pcs also provides pcsd, which operates as a GUI and remote server for PCS.

* ##### PCS Setup Cluster : 
```bash
#armadillium01
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
* ##### [PCS Create Resources](https://www.golinuxcloud.com/create-cluster-resource-in-ha-cluster-examples/):
* ##### Create WebServer Resource
```bash
### [under review]sudo pcs resource create webserver ocf:heartbeat:nginx configfile=/etc/nginx/nginx.conf op monitor timeout="5s" interval="5s"
crm configure primitive webserver ocf:heartbeat:nginx configfile=/etc/nginx/nginx.conf op start timeout="40s" interval="0" op stop timeout="60s" interval="0" op monitor interval="10s" timeout="60s" meta migration-threshold="10"
```
### ClusterLabs [Resource Agents](https://github.com/ClusterLabs/resource-agents)

* ##### [PCS Create Resources](https://www.golinuxcloud.com/create-cluster-resource-in-ha-cluster-examples/):
* ##### Create PCSFloating IP Resource:
```bash
sudo pcs resource create virtual_ip ocf:heartbeat:IPaddr2 ip=192.168.1.140 cidr_netmask=32 op monitor interval=30s
#crm configure primitive virtual_ip ocf:heartbeat:IPaddr2 params ip="192.168.1.140" cidr_netmask="32" op monitor interval="10s" meta migration-threshold="10"
```
##### Constraint:
```bash
sudo pcs constraint colocation add webserver with virtual_ip INFINITY
```

```bash
sudo pcs constraint order webserver then virtual_ip
```

#### PCS AUTH authorize host
FROM armadillium01:
```bash
sudo pcs host auth armadillium02
sudo pcs host auth armadillium03
sudo pcs host auth armadillium04
```
* user:     hacluster 
* password: use same password

note:
* user hacluster auto created when install pcs package.

* ##### Start PCS
```bash
sudo pcs cluster start --all
sudo pcs cluster enable --all
```
## PCMK
* ##### Create PCMK file
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
