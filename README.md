##### [Support UniversalBit Project](https://github.com/universalbit-dev/universalbit-dev/tree/main/support)   ##### [Disambiguation](https://en.wikipedia.org/wiki/Wikipedia:Disambiguation)   ##### [Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)
---

<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/docs/assets/images/ecosystem_gran_canaria_edited.png" width="auto" />



# [Armadillium](https://en.wikipedia.org/wiki/Thin_client) (ThinClient)
<img src="https://github.com/universalbit-dev/HArmadillium/blob/main/docs/assets/images/armadillidium.png" width="5%" />

#### Development need a digital working environment for develop with or without limit.
Create your Software, Application, WebPage,static and dynamic content.

---

### [Introduction-to-High-Availability](https://ubuntu.com/server/docs/introduction-to-high-availability)
# High Availability Clusters [HArmadillium](https://github.com/universalbit-dev/armadillium/blob/main/HArmadillium.md)

##### HARDWARE: ThinClient examples
* ThinClient HPT610 : [Specifications](https://support.hp.com/us-en/document/c03235347)
* ThinClient HPT630 : [Specifications](https://support.hp.com/us-en/document/c05240287) 
---

Operative System:
* [Debian Minimal Server](https://www.howtoforge.com/tutorial/debian-minimal-server/)
* [Ubuntu 24.04 LTS](https://ubuntu.com/download/desktop#community)

#### GPU DRIVERS:
##### [AMDVLK](https://github.com/universalbit-dev/AMDVLK) --

---

##### WebServer:
* [Nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/)
* SSH connections [wiki](https://wiki.debian.org/SSH)

##### Basic Security (If needed,use this: [SELKS](https://github.com/universalbit-dev/SELKS))
* [Ufw](https://manpages.ubuntu.com/manpages/bionic/en/man8/ufw.8.html) -- [Ufw wiki](https://wiki.debian.org/Uncomplicated%20Firewall%20%28ufw%29)
* [Haproxy](https://www.haproxy.org/) -- [Haproxy github repository:](https://github.com/haproxy/haproxy/)
* [Fail2ban](https://github.com/fail2ban/fail2ban) -- [Fail2ban wiki](https://en.wikipedia.org/wiki/Fail2ban)
* [Haveged](https://wiki.archlinux.org/title/Haveged#) (Haveged inspired algorithm has been included in the Linux kernel )

```bash
apt install ufw haproxy fail2ban
```
---
---

### Debian/Ubuntu distro: [GPUOpen-Drivers](https://github.com/GPUOpen-Drivers/AMDVLK)
* [OpenCL](https://github.com/KhronosGroup/OpenCL-Guide/blob/main/chapters/getting_started_linux.md) 
* [AMDVLK](https://github.com/GPUOpen-Drivers/AMDVLK)

```bash
apt-get install libssl-dev libx11-dev libxcb1-dev x11proto-dri2-dev libxcb-dri3-dev libxcb-dri2-0-dev libxcb-present-dev libxshmfence-dev libxrandr-dev libwayland-dev ocl-icd-opencl-dev 
```
##### amdvlk other [distro](https://github.com/GPUOpen-Drivers/AMDVLK?tab=readme-ov-file#install-dev-and-tools-packages)

---

##### Monitor server performance with 
* [Netdata](https://www.netdata.cloud/) via browser:
```bash
wget -O /tmp/netdata-kickstart.sh https://my-netdata.io/kickstart.sh && sh /tmp/netdata-kickstart.sh
```

[Bash Reference Manual](https://www.gnu.org/software/bash/manual/html_node/index.html)

### HappyCoding!
