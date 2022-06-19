# Armadillium

Development need a digital working environment for develop with or without limit.
Create your Software, Application, WebPage,static or dynamic content.
Setup HA :[HArmadillium](https://github.com/universalbit-dev/armadillium/blob/main/HArmadillium.md)

#### [UniversalBit](https://universalbit.it/blockchain) OnceAgain

##### Armadillium Digital Working Environment   

--Working Example:
* Server 01   (UniversalBit)
* Server 02   (UniversalBit)
* Server 03   (Blockchain Network Node)
* Server 04   (Gekko-M4 Nodejs App)


##### HARDWARE:

* N.4 ThinClient HPT610 : Cpu 1.6GHz ,1GB RAM ,AMD Palm Graphics,120GB SSD,Gigabit Ethernet
* N.4 Ethernet Cable 
* N.1 Gigabit Ethernet Switch 5 port

<image><schema>

##### SOFTWARE: 
Debian 11 Minimal Server Installation 
* [Foss](https://www.fosslinux.com/49956/install-debian-11-minimal-server.htm)

Extra Packages :

* Low resources Desktop-Environment [Xfce](https://www.xfce.org/)
* [Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
* SSH connections [wiki](https://wiki.debian.org/SSH)

##### Default Network Settings 

* DHCP      IP Address
* Gateway   Default Internet Provider Settings
* DNS       Default Internet Provider Settings

##### Security Standard:

* Ufw       Firewall
* Havp      Antivirus Scanner
* Haproxy   LoadBalancer
* Fail2Ban  DDos Protection

```
apt install ufw havp haproxy fail2ban
```

Firmware Linux: Add Debian 11 Repository and install firmware-linux

edit and update repository sources
```
nano /etc/apt/sources.list
```

use this repository:

```
deb http://deb.debian.org/debian/ bullseye main contrib non-free
deb http://deb.debian.org/debian/ bullseye-updates main contrib non-free
deb http://deb.debian.org/debian bullseye-proposed-updates main contrib non-free
deb http://deb.debian.org/debian-security/ bullseye-security main contrib non-free
deb http://deb.debian.org/debian/ bullseye-backports main contrib non-free
```

```
apt install firmware-linux mesa-utils
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


##### /etc/sysctl.conf - Configuration file for setting system variables
```
nano /etc/sysctl.conf
```
```
#
# /etc/sysctl.conf - Configuration file for setting system variables
# See /etc/sysctl.d/ for additional system variables.
# See sysctl.conf (5) for information.
#
kernel.domainname = homenet.telecomitalia.it

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


###################################################################
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

###################################################################
# Magic system request Key
# 0=disable, 1=enable all, >1 bitmask of sysrq functions
# See https://www.kernel.org/doc/html/latest/admin-guide/sysrq.html
# for what other values do
kernel.sysrq=438
vm.swappiness=10
vm.vfs_cache_pressure = 50

```

Monitor server performance with [Netdata](https://www.netdata.cloud/) via browser:
```
wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh && sh /tmp/netdata-kickstart.sh
```

[Atom](https://atom.io/) Editor.
```
wget -qO - https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
sudo apt-get update
```

```
sudo apt-get install atom
```



HappyCoding!
