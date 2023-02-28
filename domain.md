# Macbook 
條key name唔好有空格
下載ssh key 後，copy
open terminal 
係你名個位置打
ls -al
會發現 .ssh 
如你下載無Downloads
command
mv Downloads/keyName.pem .ssh
cd .ssh
ls -al
睇下條key係咪入面
ls
ssh -i keyName.pem @ubuntu@elasticId
第一次會問你yes/no
yes
被拒絕後  (冇拒絕係好事，正常會拒絕)
chmod 400 keyName.pem
ls -l
show到呢個係好事 -r--------@
ssh -i keyName.pem ubuntu@54.254.249.68  (Leo話ubuntu前唔洗@)
成功連到會顯示
ubuntu@ip-172-31-42-234:~$ 係前面
pwd
ls -al
cd .ssh
ssh-keygen
之後係咁禁enter, 直到見到有圖案
cat id_rsa.pub
會出左一串碼
Copy串碼
然後上github.com
右上角按落去，入setting
left bar搵SSH and GPG keys，按入去
按 Green button (New SSH key)
Title 自己改名 (我改aws)
Paste 串碼入key
按 add
輸入Github密碼