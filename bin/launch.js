#!/usr/bin/env node

const { exec } = require('child_process');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

// 获取参数
const customPath = args.p || process.cwd();
const appPath = args.a || 'devtools';

// 处理路径中的空格和特殊字符
const sanitizedPath = customPath.replace(/([$`"\\])/g, '\\$1');

const configContent = `PROJECT-PATH=${sanitizedPath}`;

// 数据写入/tmp/devtools.config
fs.writeFile('/tmp/devtools.config', configContent, (err) => {
    if (err) {
        console.error('Failed to write to /tmp/devtools.config:', err);
        return;
    }

    console.log('Config written successfully.');

    // 写入成功后开启devtools插件
    exec(`open -a ${appPath}`, (err, stdout, stderr) => {
        if (err) {
            console.error('Failed to open devtools app:', stderr);
            return;
        }

        console.log('Devtools app opened successfully.');
    });
});
