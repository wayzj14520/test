#!/bin/bash
#cd /usr/local/mall-webVue
#git add .
#git commit -m "提交更新"
#git push -u origin master
#echo "更新项目......."
#git pull
#echo "更新完成，开始安装....."
#npm install
#echo "安装完成，开始构建打包......"
#npm run build
#echo "打包完成，停止容器"
docker stop vue

docker rm vue

docker rmi vue:latest
docker build -t vue .
docker run --name vue -d -p 8080:80 vue:latest
#docker cp dist/  vue:/usr/share/nginx/html/

#docker start vue