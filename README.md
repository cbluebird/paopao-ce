# 精弘论坛

## 项目说明

本论坛使用了开源论坛框架[paopao-ce](https://github.com/rocboss/paopao-ce)。
在此基础上修改为供zjut在校生使用的校园论坛，在开始前请先阅读`/doc`下的paopao-ce官方说明文档。

## 🏗 快速开始

### 环境要求

* Go (1.20+)
* Node.js (14+)
* MySQL (5.7+)
* ...

以上环境仅供参考，其他版本的环境未进行充分测试

### 配置说明

`config.yaml.sample` 是一份完整的配置文件模版，paopao-ce启动时会读取`./custom/config.yaml`、`./config.yaml`
任意一份配置文件（优先读取最先找到的文件）。

```sh
cp config.yaml.sample config.yaml
vim config.yaml # 修改参数
paopao serve
```

配置文件中的 `Features` 小节是声明paopao-ce运行时开启哪些功能项:

```yaml
...

Features:
   Default: [ "Base", "MySQL", "Option", "LocalOSS", "LoggerFile" ]
   Develop: [ "Base", "MySQL", "Option", "Sms", "AliOSS", "LoggerZinc" ]
   Demo: [ "Base", "MySQL", "Option", "Sms", "MinIO", "LoggerZinc" ]
   Slim: [ "Base", "Sqlite3", "LocalOSS", "LoggerFile" ]
   Base: [ "Zinc", "Redis", "Alipay", ]
   Option: [ "SimpleCacheIndex" ]
   Sms: "SmsJuhe"

...
```

如上：
Default/Develop/Demo/Slim 是不同 功能集套件(Features Suite)， Base/Option 是子功能套件， Sms是关于短信验证码功能的参数选项。

这里 `Default`套件 代表的意思是： 使用`Base/Option` 中的功能，外加 `MySQL/LocalOSS/LoggerFile`
功能，也就是说开启了`Zinc/Redis/Alipay/SimpleCacheIndex/MySQL/LocalOSS/LoggerFile` 7项功能；
`Develop`套件依例类推。

使用Feautures:

```sh
release/paopao serve --help
Usage of release/paopao:
  -features value
        use special features
  -no-default-features
        whether use default features

# 默认使用 Default 功能套件
release/paopao serve

# 不包含 default 中的功能集，仅仅使用 develop 中声明的功能集
release/paopao serve --no-default-features --features develop 

# 使用 default 中的功能集，外加 sms 功能
release/paopao serve --features sms  

# 手动指定需要开启的功能集
release/paopao serve --no-default-features --features sqlite3,localoss,loggerfile,redis 
```

> 功能项状态详情参考 [features-status](features-status.md).


### 安装说明

### 方式一. 手动安装（推荐）
克隆代码库

   ```sh
   git clone https://github.com/rocboss/paopao-ce.git
   ```

#### 后端

1. 导入项目根目录下的 `scripts/paopao.sql` 文件至MySQL数据库
2. 拷贝项目根目录下 `config.yaml.sample` 文件至 `config.yaml`，按照注释完成配置编辑
3. 编译后端    
   编译api服务，并内嵌web前端ui:
    ```sh
    make build
    ```

   也可以使用精简模式编译，不内嵌web前端ui:
    ```sh
    make build TAGS='slim embed'
    ```
   编译后在`release`目录可以找到对应可执行文件。
    ```sh
    release/paopao
    ```

4. 直接运行后端    
   运行api服务:
    ```sh
    make run
    ```
   运行api服务、web前端ui服务:
    ```sh
    make run TAGS='embed'
    ```
   提示: 如果需要内嵌web前端ui，请先构建web前端(建议设置web/.env为VITE_HOST="")。

5. 使用内置的Migrate机制自动升级维护SQL DDL:
    ```sh
    # 添加 Migration 功能到 Features 中 开启migrate功能
    vim config.yaml
    # file: config.yaml
    # Features:
    #   Default: ["Base", "MySQL", "Zinc", "MinIO", "LoggerZinc", "Migration"]
   
    # 编译时加入migration tag编译出支持migrate功能的可执行文件
    make build TAGS='migration'
    release/paopao

    # 或者 带上migration tag直接运行
    make run TAGS='migration'
    ```
   > 注意：默认编译出来的可执行文件是不内置migrate功能，需要编译时带上migration tag才能内置支持migrage功能。


#### 前端

1. 进入前端目录 `web`，拷贝`.env` 到 `.env.local`，编辑 `.env.local ` 文件中后端服务地址及其他配置项，下载依赖包

    ```sh
    cd ./web && cp .env .env.local
    vim .env.local
    yarn
    ```

2. 编译前端

    ```sh
    yarn build
    ```

   build完成后，可以在dist目录获取编译产出，配置nginx指向至该目录即可

#### 桌面端

1. 进入前端目录 `web`，拷贝`.env` 到 `.env.local`，编辑 `.env.local ` 文件中后端服务地址及其他配置项，下载依赖包

    ```sh
    cd ./web && cp .env .env.local
    vim .env.local
    yarn
    ```

2. 编译前端

    ```sh
    yarn build
    ```

3. 构建桌面端
   ```sh
   yarn tauri build
   ```
   桌面端是使用[Rust](https://www.rust-lang.org/) + [tauri](https://github.com/tauri-apps/tauri)编写
   的，需要安装tauri的依赖，具体参考[https://tauri.studio/v1/guides/getting-started/prerequisites](https://tauri.studio/v1/guides/getting-started/prerequisites).


### 方式二. 使用Docker构建、运行

* 后端:
  ```sh
  # 默认参数构建, 默认内嵌web ui并设置api host为空
  docker build -t your/paopao-ce:tag .

  # 内嵌web ui并且自定义API host参数
  docker build -t your/paopao-ce:tag --build-arg API_HOST=http://api.paopao.info .

  # 内嵌web ui并且使用本地web/.env中的API host
  docker build -t your/paopao-ce:tag --build-arg USE_API_HOST=no .

  # 内嵌web ui并且使用本地编译的web/dist构建
  docker build -t your/paopao-ce:tag --build-arg USE_DIST=yes .

  # 只编译api server
  docker build -t your/paopao-ce:tag --build-arg EMBED_UI=no .

  # 运行
  mkdir custom && docker run -d -p 8008:8008 -v ${PWD}/custom:/app/paopao-ce/custom -v ${PWD}/config.yaml.sample:/app/paopao-ce/config.yaml your/paopao-ce:tag

  # 或者直接运行构建好的docker image
  mkdir custom && docker run -d -p 8008:8008 -v ${PWD}/custom:/app/paopao-ce/custom -v ${PWD}/config.yaml.sample:/app/paopao-ce/config.yaml bitbus/paopao-ce:latest
  ```

* 前端:
  ```sh
  cd web

  # 默认参数构建
  docker build -t your/paopao-ce:web .

  # 自定义API host 参数构建
  docker build -t your/paopao-ce:web --build-arg API_HOST=http://api.paopao.info .

  # 使用本地编译的dist构建
  docker build -t your/paopao-ce:web --build-arg USE_DIST=yes .

  # 运行
  docker run -d -p 8010:80 your/paopao-ce:web
  ```

### 方式三. 使用 docker-compose 运行
```sh
git clone https://github.com/rocboss/paopao-ce.git
cd paopao-ce && docker compose up -d
# visit http://localhost:8008  👀 paopao-ce
# visit http://localhost:8001  👀 RedisInsight
# visit http://localhost:8080  👀 phpMyAdmin
```

默认是使用config.yaml.sample的配置，如果需要自定义配置，请拷贝默认配置文件(比如config.yaml)，修改后再同步配置到docker-compose.yaml如下：

```
# file: docker-compose.yaml
...
  backend:
    image: bitbus/paopao-ce:latest
    restart: always
    depends_on:
      - db
      - redis
      - zinc
    # modify below to reflect your custom configure
    volumes:
      - ./config.yaml:/app/paopao-ce/config.yaml
    ports:
      - 8008:8008
    networks:
      - paopao-network
....
```

> 注意：默认提供的 docker-compose.yaml 初衷是搭建本机开发调试环境，如果需要产品部署供外网访问，请自行调优配置参数或使用其他方式部署。


### 其他说明

建议

我们推荐使用方式一（手动部署）作为生产环境的搭建方式，后端服务使用 `supervisor` 守护进程，并通过 `nginx`
反向代理后，提供API给前端服务调用。使用方式三（docker-compose ）作为本地测试的方式。

短信通道使用的[聚合数据](https://www.juhe.cn/)，如果申请不下来，可以考虑替换其他服务商。

代码结构比较简单，很方便扩展，开发文档请参阅[docs](docs '开发文档').




