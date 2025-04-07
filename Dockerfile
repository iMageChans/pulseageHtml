FROM node:18-alpine

WORKDIR /app

# 复制项目文件
COPY . .

# 安装依赖
RUN npm install

# 构建项目
RUN npm run build

# 暴露端口
EXPOSE 3003

# 启动服务
CMD ["npm", "run", "dev"]