##### SSH connection to communicate with all nodes
Install required packages <srong>TO</strong> each node and <strong>Check [ubuntu repository](#ubuntu)</strong>
* <strong>FROM</strong> armadillium01 <strong>TO</strong> armadillium02
```bash
#02
ssh armadillium02@192.168.1.142
sudo apt install corosync pacemaker fence-agents crmsh pcs* cluster-glue ufw nginx haveged heartbeat openssh-server
```
* <strong>FROM</strong> armadillium01 <strong>TO</strong> armadillium03
```bash
#03
ssh armadillium03@192.168.1.143
sudo apt install corosync pacemaker fence-agents crmsh pcs* cluster-glue ufw nginx haveged heartbeat openssh-server
```
* <strong>FROM</strong> armadillium01 <strong>TO</strong> armadillium04
```bash
#04
ssh armadillium04@192.168.1.144
sudo apt install corosync pacemaker fence-agents crmsh pcs* cluster-glue ufw nginx haveged heartbeat openssh-server
```
ssh setup
* ##### -- [#02](https://github.com/universalbit-dev/HArmadillium/blob/main/ssh/02.md) -- [#03](https://github.com/universalbit-dev/HArmadillium/blob/main/ssh/03.md) -- [#04](https://github.com/universalbit-dev/HArmadillium/blob/main/ssh/04.md)
