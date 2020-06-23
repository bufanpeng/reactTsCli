"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const version = require("../../package.json").version; //我们需要引入这个文件,下面我们会用到

module.exports = class extends Generator {
    constructor(args, opts) {
        //这个里面我们来定义一些属性和一些执行的方法
        super(args, opts);
        this.options.framework = "React"; //属性框架我们是vue 名字可以自定义哈 不用拘束
        this.options.js = "babel"; //JS我们用babel来编译更超前的语法,来兼容浏览器
        this.options.modules = "webpack"; //模块我们用webpack
        this.props = {
            projectName: "demo",
            name: "world"
        };
        //接下来我们是一些选配置的地方我们可以前提设定好一些配置属性我们在其他方法中来用
        // this.config.save(); //此方法将配置写入.yo-rc.json文件。如果该文件尚不存在，则该save方法将创建该文件
    }
    async prompting() {
        // Have Yeoman greet the user.
        this.log(
            yosay(
                `Welcome to the exceptional ${chalk.red(
                    "react-ts-cli"
                )} reactTsCli!`
            )
        );
        this.option("title", {
            //这里的title配置的是package.json的项目名称和html模板里面的title标签的内容
            type: Boolean,
            required: false
        });
        this.option("version", {
            //版本号
            type: Boolean,
            required: false
        });
        this.option("description", {
            //描述
            type: Boolean,
            required: false
        });
        this.option("author", {
            //作者
            type: Boolean,
            required: false
        });
        this.option("projectName", {
            type: Boolean,
            required: false
        });

        const prompts = [
            {
                type: "input",
                name: "title",
                message: "请输入项目名字",
                default: "default-name"
            },
            {
                type: "input",
                name: "author",
                message: "请输作者的名字",
                default: "world"
            },
            {
                type: "input", //在页面互动 输入
                name: "description",
                message: "请输入你项目的描述"
            },
            {
                type: "input", //在页面互动 输入
                name: "version",
                message: "请输入你项目的版本",
                default: "1.0.0"
            },
            {
                type: "input",
                name: "projectName",
                message: "请输入项目名字",
                default: "default-name"
            }
        ];
        this.answers = await this.prompt(prompts);
    }
    configuring() {}
    writing() {
        const pkgJson = {
            //用变量把我们需要写入package.json文件中的内容存起来;
            name: this.props.title,
            version: this.props.version,
            // "description": this.props.description,
            scripts: {
                start: "set PORT=8000&&roadhog server",
                build: "roadhog build",
                lint: "eslint --ext .js src test"
            },
            author: this.props.author,
            license: "ISC",
            dependencies: {
                antd: "^4.3.1",
                axios: "^0.19.2",
                "babel-polyfill": "^6.26.0",
                classnames: "^2.2.6",
                dva: "^2.4.1",
                history: "^4.10.1",
                "jquery-ts": "^2.1.1",
                moment: "^2.26.0",
                "optimize-css-assets-webpack-plugin": "^2.0.0",
                qs: "^6.9.4",
                "query-string": "^6.12.1",
                react: "^16.2.0",
                "react-custom-scrollbars": "^4.2.1",
                "react-dom": "^16.2.0",
                "tslint-react": "^5.0.0",
                "video.js": "^7.8.2",
                "videojs-flash": "^2.2.1",
                "webpack-cli": "^3.3.11"
            },
            devDependencies: {
                "@types/jquery": "^3.3.38",
                "@types/react": "^16.9.35",
                "@types/react-dom": "^16.9.8",
                "babel-plugin-dva-hmr": "^0.3.2",
                "babel-plugin-import": "^1.13.0",
                "babel-plugin-module-resolver": "^4.0.0",
                "clean-webpack-plugin": "^1.0.0",
                "copy-webpack-plugin": "^4.5.1",
                "css-loader": "^0.28.11",
                eslint: "^4.19.1",
                "eslint-config-prettier": "^6.11.0",
                "eslint-config-umi": "^0.1.1",
                "eslint-plugin-flowtype": "^2.34.1",
                "eslint-plugin-import": "^2.6.0",
                "eslint-plugin-jsx-a11y": "^5.1.1",
                "eslint-plugin-react": "^7.1.0",
                "file-loader": "^2.0.0",
                "html-webpack-plugin": "^3.2.0",
                husky: "^0.12.0",
                less: "^3.9.0",
                "less-loader": "^4.1.0",
                "mini-css-extract-plugin": "^0.4.4",
                mockjs: "^1.1.0",
                "react-router": "^5.2.0",
                "react-router-dom": "^5.2.0",
                "redbox-react": "^1.4.3",
                roadhog: "^2.5.0-beta.4",
                "style-loader": "^0.21.0",
                "ts-lint": "^4.5.1",
                "ts-loader": "^7.0.4",
                "uglifyjs-webpack-plugin": "^1.0.0",
                "url-loader": "^1.0.1"
            }
        };
        const file = [
            //我们把我们需要复制的文件提前定义在这个数组里
            // 'mock',
            "public",
            ".editorconfig",
            // ".gitignore",
            ".eslintrc.js",
            ".roadhogrc.js",
            ".roadhogrc.mock.js",
            ".webpackrc.js",
            "global.d.ts",
            "package.json",
            "package-lock.json",
            "tsconfig.json",
            "tslint.json",
            // 'postcss.config.js',
            // 'build/',//复制build文件夹下所有的文件
            "src/" //复制src文件夹下所有的文件
            // 'static/styles/.gitkeep'//复制静态文件夹static下的所有文件
        ];

        fs.readdir(this.sourceRoot(), (err, items) => {
            file.forEach(file => {
                this.fs.copy(
                    this.templatePath(file),
                    this.destinationPath(file)
                );
            });
            //利用这个方法创建这个文件并且把内容写进去
            try {
                this.fs.extendJSON(
                    this.destinationPath("package.json"),
                    pkgJson
                );
            } catch (err) {
                console.log(err);
            }
            console.log(this.props);
            delete this.props.env; //删除用不到的属性
            delete this.props.h;
            delete this.props.help;
            this.fs.copyTpl(
                this.templatePath("public/index.ejs"),
                this.destinationPath("public/index.ejs")
            );
        });
    }
    install() {
        this.npmInstall();
    }
};
