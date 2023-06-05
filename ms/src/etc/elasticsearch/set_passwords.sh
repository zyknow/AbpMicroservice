#!/bin/bash
set -e

PASSWORD_FILE="password_set.flag"

if [ ! -f $PASSWORD_FILE ]; then
#  echo "等待 Elasticsearch 启动..."

#  sleep 20
  
  echo "为所有内置用户设置密码..."
  COMMON_PASSWORD="123456"
  
  # 创建一个临时文件，并将通用密码写入该文件
  PASSWORD_FILE=$(mktemp)
  echo "y" >> "$PASSWORD_FILE"
  for _ in {1..14}; do
    echo "$COMMON_PASSWORD" >> "$PASSWORD_FILE"
  done
  
  # 以交互模式运行 elasticsearch-setup-passwords 命令并设置密码
  bin/elasticsearch-setup-passwords interactive < "$PASSWORD_FILE"
  
  echo "密码设置完成。"

  # 在密码设置完成后，创建一个空文件来表示已经设置了密码
  touch password_set.flag

else 
  echo "已初始化过密码"
  
fi

# 保持容器运行
exec tail -f /dev/null



