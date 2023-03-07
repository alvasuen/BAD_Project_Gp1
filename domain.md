# 請注意‼️ 段片僅供參考 本人並未完全跟足  一切後果本人並不負責
# Macbook 
# (Create database) i= write,  Esc = quit,  :w= save,  :q=quit
# 切記份project唔好係ssh入面

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
成功後去返自己Github主頁
去返自己連左EC2度Git clone (要明白而家要做既係自己係EC2開左個新電腦，所以由頭裝一次自己要安裝既野)
嘗試npm install
會話裝唔到
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
成功後
sudo apt-get install -y nodejs
成功後
node -v  睇下自己有冇裝node
npm install
裝後 開一份新既.env
touch .env
裝 postgresql
sudo apt-get install build-essential nginx htop git curl postgresql-contrib
sudo su postgres
輸入後要留意段字，如果前頭顯示 Postgres，代表成功入到Postgres
psql  入去Postgres
User 名跟返你返EC2 個名
CREATE USER ubuntu WITH PASSWORD 'ubuntu';
幫user 轉做 SuperUser
ALTER ROLE ubuntu with SUPERUSER;
\du  留意自己起左user未
睇下自己而家係咩User
SELECT current_user;
唔岩就轉返ubuntu user
set role ubuntu;
set左穩陣啲睇多次
SELECT current_user;
先開一個 database叫 ubuntu
# 如果你份project有人要跟返.env既名，咁你就要跟返原本名，佢地啱洗就冇問題，我為組員方便開一個
create database 名
create USER User名 with PASSWORD '密碼';
ALTER ROLE USER名 WITH SUPERUSER;
select current_user;
set role USER名;
select current_user;
轉哂成功後
出返去將所有野轉入去EC2
裝yarn
# 如果成功連線，想退出時
exit

# 如果TS 擺好哂係一個叫src既folder，就可以
yarn run build (將所有TS file change to js file)
如果 ts file冇執好，唯有開一個index.js黎連上去黎踢著server，因為上面只食js

forever list 可以睇到而家既狀態
想停用 forever stop ^C (呢句唔知要唔要用)
再forever stop 0 (0無你係list個時睇返其中一句data中用[]入面既數字)
想改野用 vim 你要改既野