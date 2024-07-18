#### Host Setup
#<strong>01</strong>
edit host file for armadillium01 machine (192.168.1.141) 
```bash
sudo nano /etc/hosts
```

```bash
127.0.0.1       localhost
127.0.1.1       armadillium01

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters

192.168.1.142 armadillium02
192.168.1.143 armadillium03
192.168.1.144 armadillium04
```

#<strong>02</strong>
edit host file for armadillium02 machine (192.168.1.142) 
```bash
127.0.0.1       localhost
127.0.1.1       armadillium02

# The following lines are desirable for IPv6 capable hosts
::1     ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters

192.168.1.141 armadillium01
192.168.1.143 armadillium03
192.168.1.144 armadillium04
```
