##### [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)

# Armadillium
Development need a digital working environment for develop with or without limit.
Create your Software, Application, WebPage,static or dynamic content.
# [HArmadillium](https://github.com/universalbit-dev/armadillium/blob/main/HArmadillium.md)

#### [UniversalBit](https://github.com/universalbit-dev) OnceAgain

##### Armadillium Digital Working Environment   

##### Working Example:
* Server 01   [UniversalBit-dev](https://github.com/universalbit-dev/universalbit-dev)
* Server 02   [UniversalBit-dev](https://github.com/universalbit-dev/universalbit-dev)
* Server 03   [Nodejs App](https://github.com/universalbit-dev/iD)
* Server 04   [Gekko-M4](https://github.com/universalbit-dev/gekko-m4) 

##### HARDWARE:

* N.4 ThinClient HPT610 : Cpu 1.6GHz ,1GB RAM ,AMD Palm Graphics,120GB SSD,Gigabit Ethernet

##### SOFTWARE: 
Debian 11 Minimal Server Installation 
* [Foss](https://www.fosslinux.com/49956/install-debian-11-minimal-server.htm)
* [Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
* [Apache2](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-debian-10)[Debian 11]
* [Hadoop-Common](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-common/SingleCluster.html)
* SSH connections [wiki](https://wiki.debian.org/SSH)
* Low resources Desktop-Environment [Xfce](https://www.xfce.org/)
##### Security Standard:
* Ufw       Firewall
* Havp      Antivirus Scanner
* Haproxy   LoadBalancer
* Fail2Ban  DDos Protection

```
apt install ufw havp haproxy fail2ban
```
##### Swap File 16GB:
Add Swap File.

```
sudo fallocate -l 16G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

Make the Swap File Permanent
```
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

```
nano /etc/sysctl.conf
```
```
#
# /etc/sysctl.conf - Configuration file for setting system variables
# See /etc/sysctl.d/ for additional system variables.
# See sysctl.conf (5) for information.
#
#kernel.domainname =

# Uncomment the following to stop low-level messages on console
kernel.printk = 3 4 1 3

###################################################################
# Functions previously found in netbase
#

# Uncomment the next two lines to enable Spoof protection (reverse-path filter)
# Turn on Source Address Verification in all interfaces to
# prevent some spoofing attacks
net.ipv4.conf.default.rp_filter=1
net.ipv4.conf.all.rp_filter=1

# Uncomment the next line to enable TCP/IP SYN cookies
# See http://lwn.net/Articles/277146/
# Note: This may impact IPv6 TCP sessions too
net.ipv4.tcp_syncookies=1

# Uncomment the next line to enable packet forwarding for IPv4
net.ipv4.ip_forward=1

# Uncomment the next line to enable packet forwarding for IPv6
#  Enabling this option disables Stateless Address Autoconfiguration
#  based on Router Advertisements for this host
net.ipv6.conf.all.forwarding=1
# Additional settings - these settings can improve the network
# security of the host and prevent against some network attacks
# including spoofing attacks and man in the middle attacks through
# redirection. Some network environments, however, require that these
# settings are disabled so review and enable them as needed.
#
# Do not accept ICMP redirects (prevent MITM attacks)
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0
# _or_
# Accept ICMP redirects only for gateways listed in our default
# gateway list (enabled by default)
net.ipv4.conf.all.secure_redirects = 1
#
# Do not send ICMP redirects (we are not a router)
net.ipv4.conf.all.send_redirects = 0
#
# Do not accept IP source route packets (we are not a router)
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0
#
# Log Martian Packets
net.ipv4.conf.all.log_martians = 1
#
# Magic system request Key
# 0=disable, 1=enable all, >1 bitmask of sysrq functions
# See https://www.kernel.org/doc/html/latest/admin-guide/sysrq.html
# for what other values do
kernel.sysrq=438
vm.swappiness=10
vm.vfs_cache_pressure = 50
```

#### [OpenCL](https://github.com/universalbit-dev/CityGenerator/blob/master/OpenCL-WebGL-WebCL-Taiwan_Feb-2012.pdf)
```
sudo apt install ocl-icd-opencl-dev
```


##### Monitor server performance with [Netdata](https://www.netdata.cloud/) via browser:
```
wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh && sh /tmp/netdata-kickstart.sh
```

[Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)

### HappyCoding!
