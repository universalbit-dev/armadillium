##### [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)
<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/docs/assets/images/ecosystem_gran_canaria_edited.png" width="auto" />

# [Armadillium](https://github.com/universalbit-dev/HArmadillium) (ThinClient)
<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/docs/assets/images/armadillium.png" width="5%" />

Development need a digital working environment for develop with or without limit.
Create your Software, Application, WebPage,static and dynamic content.

# Cluster [HArmadillium](https://github.com/universalbit-dev/armadillium/blob/main/HArmadillium.md)

##### HARDWARE:
* N.4 ThinClient HPT610 : Cpu 1.6GHz ,1GB RAM ,AMD Palm Graphics,120GB SSD,Gigabit Ethernet

##### Debian Minimal Server Installation :[Debian Community](https://www.debian.org/)
##### [Debian 11] Minimal Server Installation :[Foss](https://www.fosslinux.com/49956/install-debian-11-minimal-server.htm)
##### [Debian 12](https://www.howtoforge.com/tutorial/debian-minimal-server/)
---

##### WebServer:
* [Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
* [Apache2](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-debian-10)[Debian 11]

---
SSH connections [wiki](https://wiki.debian.org/SSH)
---

##### Basic Security (If needed,use this: [SELKS](https://github.com/StamusNetworks/SELKS))
* [Ufw](https://wiki.debian.org/Uncomplicated%20Firewall%20%28ufw%29)       Firewall
* [Havp](https://www.havp.org/)      Antivirus Scanner
* [Haproxy](https://www.haproxy.org/)   LoadBalancer
* [Fail2Ban](https://github.com/fail2ban/fail2ban)  DDos Protection
* [Haveged](https://wiki.archlinux.org/title/Haveged#) (HAVEGED inspired algorithm has been included in the Linux kernel )

```bash
apt install ufw havp haproxy fail2ban
```
Debian/Ubuntu distro:
#### [OpenCL](https://github.com/KhronosGroup/OpenCL-SDK) and [AMDVLK](https://github.com/universalbit-dev/AMDVLK)
```bash
apt-get install libssl-dev libx11-dev libxcb1-dev x11proto-dri2-dev libxcb-dri3-dev libxcb-dri2-0-dev libxcb-present-dev libxshmfence-dev libxrandr-dev libwayland-dev ocl-icd-opencl-dev 
```
###### amdvlk other [distro](https://github.com/GPUOpen-Drivers/AMDVLK?tab=readme-ov-file#install-dev-and-tools-packages)

---

#### [6to4](https://github.com/universalbit-dev/HArmadillium/blob/main/6to4.md) IPv6 Address Planning

##### Monitor server performance with 
* [Netdata](https://www.netdata.cloud/) via browser:
```bash
wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh && sh /tmp/netdata-kickstart.sh
```

[Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)

### HappyCoding!
