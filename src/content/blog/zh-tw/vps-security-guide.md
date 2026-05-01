---
title: "VPS 伺服器基礎安全防護設定指南"
pubDate: 2026-03-11
description: "全新的VPS獲取後，需做的基本動作"
category: "開發"
tags: ["安全", "Linux", "DevOps"]
---

這是一篇針對剛購買全新 VPS 進行安全防護強化的指南。本指南將使用 Debian 系統作為示範

## VPS第一步基礎設定

在剛拿到您的新主機時，最重要的事情是確認目前的使用者狀態與系統版本。

### 1. 登入伺服器與更改Root預設密碼建立自訂帳號

改變你的 root 密碼
```bash
passwd
```

請不要堅持使用 root 帳號進行日常操作。我們建議您建立一個專屬的一般使用者，並賦予 \`sudo\` 權限以維護主機安全性。

```bash
useradd -m your_username
usermod -aG sudo your_username
```


## 2. NTP同步

確保伺服器的時間同步是非常重要的，尤其當您打算部屬憑證或是進行日誌檔追蹤的時候。
  ### 2-1. 安装 NTP
  ```bash
apt-get update
apt-get install ntp
  ```
 ### 2-2. 配置 NTP
  使用文本編輯器開啟NTP配置文件```/etc/ntp.conf``` 
  ```bash
nano /etc/ntp.conf
  ```
在配置文件中內有一些默認的NTP伺服器，您可以保留這些默認伺服器或跟改成您想設定的特定伺服器

設定成您想使用的NTP伺服器
```bash
server "your-ntp-server"
```
*註將server your-ntp-server更改成您想使用的NTP伺服器

更改完成後儲存文件

### 2-3 重啟NTP
```bash
systemctl restart ntp
```
如您需要NTP伺服器在重啟後，自動啟動NTP服務
```
systemctl enable ntp
```
### 2-4驗證同步時間
檢查NTP伺服器是否運行
```bash
systemctl status ntp
```
檢查並會顯示NTP服務同步狀態訊息
```bash
date
```
如顯示的訊息是錯誤或不同步，使用以下指令強制同步
```bash
ntpdate -q your-ntp-server
```
*註 將your-ntp-server更改成您使用的伺服器

檢視NTP守護進程的同步狀態
```bash
ntpq -p
```



## 3. 改變 SSH Port

將預設的 Port 22 換掉能大幅度減少那些每天無腦掃描網段腳本的暴力破解頻率。

### 3-1 修改SSH設定檔

```bash
sudo nano /etc/ssh/sshd_config
```
找到port 22 ，修改成您想使用的port
```bash
Port <your_ssh_port>
```
在port添加Protocol 2確保	SSH只使用Protocol 2
```bash
Protocol 2
```



## 4. 關閉 root 的 SSH 權限、允許 SSH 登入帳號

### 4-1 請開啟 SSH 設定檔
```bash
sudo nano /etc/ssh/sshd_config
```
### 4-2 PermitRootLogin 的參數值改為 no，且插入新的一行指令 AllowUsers 設定使用者帳號登入權限

```bash
PermitRootLogin no
AllowUsers <your_user_account>
```
儲存並離開且重啟SSH服務
```
sudo systemctl restart ssh
```



## 5. 設定 SSH 免密碼登入 (SSH Key)

相較於字串密碼，使用 RSA 或 Ed25519 建立金鑰對是更穩妥的登入驗證方式。

### 5-1 建立.ssh文件並新增```authorized_keys```
```bash
mkdir /home/<your_user_account>/.ssh
nano /home/<your_user_account>/.ssh/authorized_keys
```
將公鑰內容複製到 ```authorized_keys``` ，複製好後儲存離開

設定```authorized_keys```權限
```bash
chmod 0600 /home/<your_user_account>/.ssh/authorized_keys
```


## 6. 關閉 SSH 密碼登入功能

一旦金鑰連線測試無誤，立刻關閉 \`PasswordAuthentication\`，自此密碼窮舉攻擊對你無效。

### 6-1 開啟 SSH 設定檔
```bash
sudo nano /etc/ssh/sshd_config
```
將 PasswordAuthentication 的參數值改為 no
```bash
PasswordAuthentication no
```
儲存並離開，且重啟SSH服務
```bash
sudo systemctl restart ssh
```



## 7. UWF 防火牆

UFW 是一套好用的伺服器防火牆外殼工具。

### 7-1 安裝UFW並設定
```bash
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```



## 8. 入侵檢測 Intrusion Detection

#### 8-1 建構您的惡意流量警報與自動封鎖系統。
安裝 Fail2Ban 來預防暴力登入
```bash
sudo add-apt-repository universe
sudo apt-update
sudo apt install fail2ban
```
或者使用[crowdsec](https://app.crowdsec.net/security-engines/setup?distribution=linux)也可以搭配Fail2Ban一起使用，[CrowdSec](https://app.crowdsec.net/security-engines/setup?distribution=linux)是現代化的 Fail2ban，利用全網社群力量主動發現並阻斷高危 IP。

安裝和配置方法請參照[官方Docs](https://doc.crowdsec.net/)