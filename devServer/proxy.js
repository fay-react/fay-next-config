const fs = require('fs');
const path = require('path');

function getProxy(){
    let proxy={};
    try{
        const filePath = path.join(process.cwd(), '/proxy.json');
        const status = fs.statSync(filePath);
        if(status.isFile()){
            const appProxy = require(filePath);
            appProxy.map((item, i) => {
                const {path, target, changeOrigin=false, ...options} = item;
                proxy = {...proxy, ['/'+path]: {target, pathRewrite: {['^/'+path]: ''}, changeOrigin, ...options}};
                console.log('proxy: /'+path+'->'+target);
            })
        }
    } catch (e) {
        // console.info(e);
    }
    return proxy;
}

module.exports = getProxy;